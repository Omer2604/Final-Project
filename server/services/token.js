const jwt = require("jsonwebtoken");
const config = require("config");

console.log("Test"); // For debugging, to ensure the file is running

const jwtKey = config.get("jwtKey");
if (!jwtKey) {
  throw new Error("Missing jwtKey in configuration.");
}

function generateAuthToken(user) {
  // Removed the user object validation
  const token = jwt.sign(
    { _id: user._id, biz: user.biz, isAdmin: user.isAdmin },
    config.get("jwtKey"),
    { expiresIn: "6h" }
  );
  return token;
}

function verifyToken(tokenFromUser) {
  try {
    const userData = jwt.verify(tokenFromUser, jwtKey);
    return userData;
  } catch (error) {
    return null;
  }
}

module.exports = { generateAuthToken, verifyToken };
