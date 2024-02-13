const mongoose = require("mongoose");
const {
  generateAuthToken,
  adjustedCurrentDate,
} = require("../Users/authService");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 256 },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 256,
      unique: true,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
    biz: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.generatePasswordResetToken = function () {
  this.resetPasswordToken = generateAuthToken(this);
  this.resetPasswordExpires = adjustedCurrentDate(3); // 3 hours from now
  return this.resetPasswordToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
