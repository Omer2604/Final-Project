const jwt = require("jsonwebtoken");
const config = require("config");

function generateAuthToken(user) {
  const payload = {
    _id: user._id,
    biz: user.biz,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, config.get("jwtKey"), { expiresIn: "3h" });
}

function adjustedCurrentDate(hours) {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + hours);
  return date;
}

exports.generateAuthToken = generateAuthToken;
exports.adjustedCurrentDate = adjustedCurrentDate;
