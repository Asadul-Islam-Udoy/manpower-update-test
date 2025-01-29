const { sendMailMethod } = require("../message/sendTokenEmail");
const crypto = require("crypto");
const emailVerifiedMethod = async (req, res, admin) => {
    try {
        const otp = crypto.randomBytes(2).toString("hex").toLocaleUpperCase();
        admin.is_otp = otp;
        admin.otp_expiresIn = Date.now() + 24 * 60 * 60 * 1000; //you can add any expires time
        admin.save({ validateBeforeSave: false });
        await sendMailMethod({
            subject: "This is the man power system",
            email: admin.email,
            message: otp,
            res,
        });
        res.status(201).json({
            success: true,
            message: 'send verified otp your email address please check it!'
        });
        return admin;
    } catch (error) {
        admin.is_email_verified = false;
        admin.is_otp = undefined;
        admin.otp_expiresIn = undefined;
        admin.save({ validateBeforeSave: false });
        return res.status(400).json({
            success: false,
            message: err,
        });
    }
};

module.exports = emailVerifiedMethod;
