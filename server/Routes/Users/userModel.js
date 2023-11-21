const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

function generateAuthToken(user) {
  if (
    typeof user._id === "undefined" ||
    typeof user.biz === "undefined" ||
    typeof user.isAdmin === "undefined"
  ) {
    console.error("Missing user properties: ", {
      _id: !!user._id,
      biz: !!user.biz,
      isAdmin: typeof user.isAdmin !== "undefined",
    });
    throw new Error("User object is missing required properties");
  }

  return jwt.sign(
    { _id: user._id, biz: user.biz, isAdmin: user.isAdmi },
    config.get("jwtKey"),
    { expiresIn: "3h" }
  );
}

function adjustedCurrentDate(hours) {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + hours);
  return date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 256,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    biz: {
      type: Boolean,
      default: false,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
      default: () => new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours in milliseconds
    },
  },
  { timestamps: true }
);

userSchema.methods.generatePasswordResetToken = function () {
  console.log("Debug: User Object:", this);

  const resetPasswordToken = generateAuthToken(this);
  console.log("Debug: Generated Token:", resetPasswordToken);

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpires = adjustedCurrentDate(6); // Use the function here

  console.log("Debug: Token reset expiration:", this.resetPasswordExpires);

  return resetPasswordToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
