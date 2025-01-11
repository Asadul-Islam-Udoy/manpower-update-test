const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userType: {
      type: String,
      default: "client",
    },
    is_otp: {
      type: String,
    },
    otp_expiresIn: {
      type: Date,
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
    is_temp: {
      type: String,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.compareUserPasswordMethod = async function (password) {
  return await bcrypt.compare(password, this.password);
};

///create json web token
UserSchema.methods.getUserTokenMethod = function () {
  const accesstoken = jwt.sign({ _id: this._id }, process.env.JWT_SECRITE_KEY, {
    expiresIn: "30d",
  });
  const refreshtoken = jwt.sign(
    { _id: this._id },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "40d" }
  );

  const tokens = { accesstoken: accesstoken, refreshtoken: refreshtoken };
  return tokens;
};
module.exports = mongoose.model("User", UserSchema);
