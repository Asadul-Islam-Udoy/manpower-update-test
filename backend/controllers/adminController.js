const AsyncErrorHandler = require("../error/AsyncError");
const emailVerifiedMethod = require("../externalfunction/AdminEmail.js");
const Admin = require("../models/admin");
const adminTokenMethod = require("../token/admin_get_Token.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");


// signup  user controller ///apps developer
exports.NewAdminRegisterController = async (req, res) => {
  try {
    const { name, phone, email, password ,userRole } = req.body;
    const checkadmin = await Admin.findOne({
      $or: [{ email: { $eq: email } }, { phone: { $eq: phone } }],
    });
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (
      checkadmin &&
      (checkadmin?.is_email_verified)
    ) {
      return res.status(400).json({
        flag: false,
        message: "admin is already exist!",
      });
    } else {
      if (
        checkadmin && !checkadmin?.is_email_verified
      ) {
        await Admin.findByIdAndDelete(checkadmin._id);
      }
      if (email !== "" && phone !== "") {
        if (!email.match(emailFormat)) {
          return res.status(400).json({
            flag: false,
            message: "please enter the currect email address",
          });
        }
        if (Number(phone)) {
          if (phone.length >= 12 || phone.length <= 5) {
            return res.status(400).json({
              flag: false,
              message: "phone number will be maximum 11 and minimum 5 ",
            });
          }
        } else {
          return res.status(400).json({
            flag: false,
            message: "phone will be number type",
          });
        }
        const admin = await Admin.create({
          email: email,
          phone: phone,
          name: name,
          password,
          userType:userRole
        });
        await emailVerifiedMethod(req, res, admin); ///send otp user email address method
      }
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

/// new create admin verified
exports.NewAdminRegisterVerifiedController=async(req,res)=>{
   try{
    const otp = req.params.userOtp;
    const admin = await Admin.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "user otp is wrong" + " or " + "user otp is time expires",
      });
    } else {
      admin.is_otp = undefined;
      admin.otp_expiresIn = undefined;
      admin.is_email_verified = true;
      admin.save({ validateBeforeSave: false });
      res.status(200).json({
        flag:true,
        message: 'user otp verified successfully'
      })
    }
   }
   catch(error){
    return res.status(500).json({
      flag:false,
      message:error.message
    })
   }
}

///user login controller
exports.adminSignIn = AsyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password").populate({path:'roles',populate:{path:'permissions',model:'Permission'}});
  if (!admin) {
    return res.status(400).json({
      flag: false,
      message: "your email is not exists",
    });
  }
  const match = await admin.compareAdminPasswordMethod(password);
  if (!match) {
    return res.status(400).json({
      flag: false,
      message: "incurrent password",
    });
  }
  await adminTokenMethod(admin, res, 200);
});

///resend email link
exports.resendEmailOtp = async (req, res) => {
  const admin = await Admin.findById(req.params.id); ///user id
  await emailVerifiedMethod(req, res, admin); ///send mail verified link method
};

//toeken refresh
exports.AdminrefreshToken = async (req, res) => {
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
      const adminfind = await Admin.findById(decode._id).populate({path:'roles',populate:{path:'permissions',model:'Permission'}});;
      if (!adminfind) {
        res.status(400).json({
          flag: false,
          message: "admin token is wrong",
        });
      }
      await adminTokenMethod(adminfind, res, 200);
    } else {
      console.log("token errors");
    }
  } catch (err) {
    res.status(400).json({
      flag: false,
      message: "admin token somthing is  wrong",
    });
  }
};

// List all users
exports.listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({_id:{$ne:req?.user?._id}}).populate({path:'roles',populate:{path:'permissions',model:'Permission'}});
    res.status(200).json({
      flag: true,
      message: "all user getting successfully",
      admins,
    });
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "all admins getting fails",
    });
  }
};

// Get a user by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "user id is not validated!",
      });
    }
    res.status(200).json({
      flag: true,
      message: "getting single user successfully",
      admin,
    });
  } catch (error) {
    res.status(400).json({
      flag: false,
      message: "single user getting fails!",
    });
  }
};

// Update a admin
exports.updateAdminController = async (req, res) => {
  try {
    const { name } = req.body;
    const admin = await Admin.findById(req.params.id);
    let avatar = "";
    if (req.file) {
      avatar = req.file.filename;
      const avatarpath = path.join(
        path.dirname(__dirname),
        "../backend/public/images/avatars/"
      );
      if (fs.existsSync(avatarpath + admin.avatar)) {
        fs.unlink(avatarpath + admin.avatar, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("file update  successfully!");
          }
        });
      }
    }

    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "admin  is not found!",
      });
    }
    admin.name = name;
    admin.avatar = avatar || admin.avatar || null;
    admin.save({ validateBeforeSave: false });
    await adminTokenMethod(admin, res, 200);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Update a user email
exports.updateAdminEmail = async (req, res) => {
  try {
    const { adminPassword, newEmail } = req.body;
    const admin = await Admin.findById(req.user._id).select("+password");
    if (!admin) {
      res.status(400).json({
        flag: false,
        message: "admin id is not validated!",
      });
    }
    const match = await admin.compareAdminPasswordMethod(adminPassword);
    if (!match) {
      return res.status(400).json({
        flag: false,
        message: "incurrent password",
      });
    }

    const checkadminemail = await Admin.findOne({ email: newEmail });
    if (checkadminemail) {
      return res.status(400).json({
        flag: false,
        message: "your email is already exists",
      });
    }

    const newupdate = await Admin.findByIdAndUpdate(
      req.user._id,
      { isOThers: newEmail },
      { new: true }
    );
    ///send mail verified otp
    await emailVerifiedMethod(req, res, newupdate);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

//admin update email verified
exports.adminUpdateEmailVerified = async (req, res) => {
  const { otp } = req.body;
  const admin = await Admin.findOne({
    is_otp: otp,
    otp_expiresIn: { $gte: Date.now() },
  });
  if (!admin) {
    return res.status(400).json({
      flag: false,
      message: "your otp time is expires or otp is wrong!",
    });
  }
  admin.email = admin.isOThers;
  admin.isOThers = undefined;
  admin.is_otp = undefined;
  admin.otp_expiresIn = undefined;
  admin.save({ validateBeforeSave: false });
  res.status(200).json({
    flag: true,
    message: "email update successfully!",
  });
};

//update admin password
exports.updateAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.user._id).select("+password");
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "admin is not found!",
      });
    }
    const match = await admin.compareAdminPasswordMethod(oldPassword);
    if (!match) {
      return res.status(400).json({
        flag: false,
        message: "admin before password is not match",
      });
    }
    admin.password = newPassword;
    admin.save({ validateBeforeSave: false });
    res.status(200).json({
      flag: true,
      message: "admin password update successfull",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};

// Delete a Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "admin  is not validated!",
      });
    }
    const admins = await Admin.find();
    res.status(200).json({
      flag: true,
      message: "admin delete successfully!",
      admins,
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: "admin delete fails",
    });
  }
};

///user password reset
exports.adminPasswordReset = async (req, res) => {
  try {
    const oldemail = req.body.oldEmail;
    const admin = await Admin.findOne({ email: oldemail });
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "your email is not exists!",
      });
    }
    ///email verification methond
    await emailVerifiedMethod(req, res, admin);
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error,
    });
  }
};

///user password reset confirm verified;
exports.adminPasswordResetConfirm = async (req, res) => {
  try {
    const { otp, newPassword, confirmPassword } = req.body;
    const admin = await Admin.findOne({
      is_otp: otp,
      otp_expiresIn: { $gte: Date.now() },
    });
    if (!admin) {
      return res.status(400).json({
        flag: false,
        message: "your otp is wrong or otp time is expires!",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        flag: false,
        message: "your confirm password is not match!",
      });
    }
    admin.password = newPassword;
    admin.is_otp = undefined;
    admin.otp_expiresIn = undefined;
    admin.save({ validateBeforeSave: false });

    res.status(201).json({
      flag: true,
      message: "password is update successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      flag: false,
      message: error.message,
    });
  }
};
