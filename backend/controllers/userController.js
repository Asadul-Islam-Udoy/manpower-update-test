const UserPhoneVerifiedMethod = require("../externalfunction/UserPhone.js");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const userTokenMethod = require("../token/user_get_Token.js");
const ClientProfile = require("../models/clientProfile.js");
const WorkerProfile = require("../models/workerProfile.js");
const emailVerifiedMethod = require("../externalfunction/UserEmail.js");

// signup  user controller ///apps developer
exports.UserSignupController = async (req, res) => {
  try {
    const { username, phone, email, password, userType } = req.body;
    const checkuser = await User.findOne({
      $or: [{ email: { $eq: email } }, { phone: { $eq: phone } }],
    });
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (checkuser && checkuser?.is_phone_verified) {
      return res.status(400).json({
        flag: false,
        message: "user is already exist!",
      });
    } else {
      if (checkuser && !checkuser?.is_phone_verified) {
        await User.findByIdAndDelete(checkuser._id);
      }
      if (email !== "" && phone !== "") {
        if (!email.match(emailFormat)) {
          return res.status(400).json({
            flag: false,
            message: "please enter the currect email address",
          });
        } 
        if(Number(phone)) {
          if (phone.length > 11 || phone.length <= 5) {
            return res.status(400).json({
              flag: false,
              message: "phone number will be maximum 11 and minimum 5 ",
            });
          }
        }
        else{
          return res.status(400).json({
            flag: false,
            message: "phone will be number type",
          });  
        }
         const user = await User.create({
            email: email,
            phone:phone,
            username,
            password,
            userType,
          });
          await emailVerifiedMethod(req, res, user, email); ///send otp user email address method 
      }
      if (email !== '') {
        if (email.match(emailFormat)) {
          const user = await User.create({
            email: email,
            username,
            password,
            userType,
          });
          await emailVerifiedMethod(req, res, user, email); ///send otp user email address method
        }
      }
      if (phone !== '') {
        if(Number(phone)) {
          if (phone.length >= 12 || phone.length <= 5) {
            return res.status(400).json({
              flag: false,
              message: "phone number will be maximum 11 and minimum 5 ",
            });
          }
          const user = await User.create({
            phone: phone,
            username,
            password,
            userType,
          });
          await UserPhoneVerifiedMethod(req, res, user, phone); ///phone number verification methond
        }
        else{
          return res.status(400).json({
            flag: false,
            message: "phone will be number type",
          });  
        }
      }
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

//phone or email verified method ///apps developer
exports.PhoneOrEmailVerifiedController = async (req, res) => {
  try {
    const otp = req.body.otp;
    const user = await User.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        flag: false,
        message: "user otp is wrong" + " or " + "user otp is time expires",
      });
    } else {
      if (user?.userType == "client") {
        await ClientProfile.create({
          user: user._id,
          username: user.username,
          phone_or_email: user.phone || user.email,
        });
      } else {
        if (req.body.userType !== "admin") {
          await WorkerProfile.create({
            user: user._id,
            username: user.username,
            phone_or_email: user.phone || user.email,
            apply: true,
          });
        } else {
          await WorkerProfile.create({
            user: user._id,
            username: user.username,
            phone_or_email: user.phone || user.email,
            apply: false,
          });
        }
      }
      user.is_otp = undefined;
      user.otp_expiresIn = undefined;
      user.is_phone_verified = true;
      user.save({ validateBeforeSave: false });
      await userTokenMethod(user, res, 200);
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "user otp verified falis" + " " + error,
    });
  }
};

/// user signin controller // app developer
exports.UserSigninController = async (req, res) => {
  try {
    const { phone_or_email, password } = req.body;
    const checkuser = await User.findOne({
      $or: [
        { email: { $eq: phone_or_email } },
        { phone: { $eq: phone_or_email } },
      ],
    }).select("+password");
    if (!checkuser) {
      return res.status(400).json({
        flag: false,
        message: "user is not exists!",
      });
    } else {
      const match = await checkuser.compareUserPasswordMethod(password);
      if (!match) {
        return res.status(400).json({
          flag: false,
          message: "incurrent password",
        });
      }
      await userTokenMethod(checkuser, res, 200);
    }
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "user create fails" + error,
    });
  }
};

///user refresh token
exports.UserrefreshToken = async (req, res) => {
  try {
    const refreshtoken = req.headers["authorization"];
    const decode = await jwt.verify(
      refreshtoken,
      process.env.JWT_REFRESH_KEY,
      function (err, decoded) {
        if (err) {
          res.status(400).json({
            flag: false,
            message: err.message,
          });
        } else {
          return decoded;
        }
      }
    );
    if (decode) {
      const userfind = await User.findById(decode._id);
      if (!userfind) {
        res.status(400).json({
          flag: false,
          message: "user token is wrong",
        });
      }
      await userTokenMethod(userfind, res, 200);
    } else {
      console.log("token errors");
    }
  } catch (err) {
    res.status(400).json({
      flag: false,
      message: "user token somthing is  wrong",
    });
  }
};

///google login
exports.ReactGoogleLoginController = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      user.is_otp = undefined;
      user.otp_expiresIn = undefined;
      user.is_phone_verified = true;
      user.save({ validateBeforeSave: false });
      await userTokenMethod(user, res, 200);
    } else {
      const user = await User.create({
        email,
      });
      if (user.userType == "client") {
        await ClientProfile.create({
          user: user._id,
          phone_or_email: user.phone || user.email,
        });
      }
      await userTokenMethod(user, res, 200);
    }
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "user otp verified falis" + " " + error,
    });
  }
};

// Delete a user
exports.deleteUserController = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        flag: false,
        message: "user  is not validated!",
      });
    } else {
      const clientProfile = await ClientProfile.findOne({
        user: req.params.id,
      });
      if (clientProfile) {
        if (clientProfile.avatar) {
          const avatarpath = path.join(
            path.dirname(__dirname),
            "../backend/public/images/avatars/"
          );
          if (fs.existsSync(avatarpath + clientProfile.avatar)) {
            fs.unlink(avatarpath + clientProfile.avatar, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("delete successfully!");
              }
            });
          }
        }
        await ClientProfile.findByIdAndDelete(clientProfile._id);
      }
      const workerProfile = await WorkerProfile.findOne({
        user: req.params.id,
      });
      if (workerProfile) {
        if (workerProfile.avatar) {
          const avatarpath = path.join(
            path.dirname(__dirname),
            "../backend/public/images/avatars/"
          );
          if (fs.existsSync(avatarpath + workerProfile.avatar)) {
            fs.unlink(avatarpath + workerProfile.avatar, (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("delete successfully!");
              }
            });
          }
        }
        await WorkerProfile.findByIdAndDelete(workerProfile._id);
      }
    }
    res.status(200).json({
      flag: true,
      message: "user delete successfully!",
    });
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "user delete fails",
    });
  }
};

///user forget password controller ///apps developer
exports.UserForgetPasswordController = async (req, res) => {
  try {
    const { phone_or_email } = req.body;
    const checkuser = await User.findOne({
      $or: [
        { email: { $eq: phone_or_email } },
        { phone: { $eq: phone_or_email } },
      ],
    }).select("+password");
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!checkuser) {
      return res.status(400).json({
        flag: false,
        message: "user is not exists!",
      });
    } else {
      if (phone_or_email.match(emailFormat)) {
        await emailVerifiedMethod(req, res, checkuser, phone_or_email); ///send otp user email address method
      } else if (Number(phone_or_email)) {
        if (phone_or_email.length >= 11 || phone_or_email.length <= 5) {
          return res.status(400).json({
            flag: false,
            message: "phone number will be maximum 11 and minimum 5 ",
          });
        }
        await UserPhoneVerifiedMethod(req, res, checkuser, phone_or_email); ///phone number verification methond
      } else {
        res.status(400).json({
          flag: false,
          message: "please enter the email or phone number",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "user  update fails!" + error,
    });
  }
};

///user forget password confirm controller ///apps developer
exports.UserForgetPasswordConfiromController = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;
    const user = await User.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        flag: false,
        message: "user otp is wrong" + " or " + "user otp is time expires",
      });
    } else {
      user.is_otp = undefined;
      user.otp_expiresIn = undefined;
      user.password = newPassword;
      user.save({ validateBeforeSave: false });
      res.status(200).json({
        flag: true,
        message: "password update successfully!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "user otp verified falis" + " " + error,
    });
  }
};

///update user phone or email ///apps developer
exports.updateUserPhoneOrEmailController = async (req, res) => {
  try {
    const { oldPhoneNumber_Or_email, newPhoneNumber_Or_email } = req.body;
    const user = await User.findById(req.user._id);
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!user) {
      res.status(400).json({
        flag: false,
        message: "user is not not found!",
      });
    }
    if (!oldPhoneNumber_Or_email) {
      return res.status(400).json({
        flag: false,
        message: "old phone  number or email is required",
      });
    }
    const match = await User.findOne({
      $or: [
        { phone: { $eq: oldPhoneNumber_Or_email } },
        { email: { $eq: oldPhoneNumber_Or_email } },
      ],
    });
    if (!match) {
      return res.status(400).json({
        flag: false,
        message: "old phone number or email is not match",
      });
    } else {
      if (newPhoneNumber_Or_email == user.email || user.phone) {
        return res.status(400).json({
          flag: false,
          message: "user email is same!",
        });
      }
      if (newPhoneNumber_Or_email.match(emailFormat)) {
        await User.findByIdAndUpdate(
          match._id,
          { is_temp: newPhoneNumber_Or_email },
          { new: true }
        );
        await emailVerifiedMethod(req, res, match, newPhoneNumber_Or_email); ///send mail verified link method
      } else if (Number(newPhoneNumber_Or_email)) {
        if (newPhoneNumber_Or_email.length > 11) {
          return res.status(400).json({
            flag: false,
            message: "phone number will be maximum 11",
          });
        }
        await User.findByIdAndUpdate(
          match._id,
          { is_temp: newPhoneNumber_Or_email },
          { new: true }
        );
        await UserPhoneVerifiedMethod(req, res, match, oldPhoneNumber_Or_email); ///phone number verification methond
      } else {
        res.status(400).json({
          flag: false,
          message: "please enter the email or phone number",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "user  update fails!" + error,
    });
  }
};

//user update phone or email verified   ///apps developer
exports.UserUpdatePhoneOrEmailVerifiedController = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!user) {
      return res.status(400).json({
        flag: false,
        message: "your otp time is expires or otp is wrong!",
      });
    }
    if (user.is_temp.match(emailFormat)) {
      user.email = user.is_temp;
      user.phone = undefined;
    } else if (Number(user.is_temp)) {
      if (user.is_temp.length > 11) {
        return res.status(400).json({
          flag: false,
          message: "phone number will be maximum 11",
        });
      }
      user.phone = user.is_temp;
      user.email = undefined;
    } else {
      res.status(400).json({
        flag: false,
        message: "please enter the email or phone number",
      });
    }
    const clientProfile = await ClientProfile.findOne({ user: user._id });
    if (clientProfile) {
      await ClientProfile.findByIdAndUpdate(
        clientProfile._id,
        { phone_or_email: user.is_temp },
        { new: true }
      );
    }
    const workerProfile = await WorkerProfile.findOne({ user: user._id });
    if (workerProfile) {
      await WorkerProfile.findByIdAndUpdate(
        workerProfile._id,
        { phone_or_email: user.is_temp },
        { new: true }
      );
    }
    user.is_otp = undefined;
    user.otp_expiresIn = undefined;
    user.is_temp = undefined;
    user.save({ validateBeforeSave: false });
    res.status(200).json({
      flag: true,
      message: "update  successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "update fails!" + error,
    });
  }
};
