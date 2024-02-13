const jwt = require("jsonwebtoken");
const config = require("config");

const jwtKey = config.get("jwtKey");
if (!jwtKey) {
  console.error("Fatal Error: jwtKey is not defined.");
  process.exit(1);
}

function generateAuthToken(user) {
  if (!user._id || user.biz === undefined || user.isAdmin === undefined) {
    throw new Error(
      "User object is missing required properties for token generation."
    );
  }

  const tokenData = { _id: user._id, biz: user.biz, isAdmin: user.isAdmin };
  return jwt.sign(tokenData, jwtKey, { expiresIn: "6h" });
}

function verifyToken(tokenFromUser) {
  try {
    return jwt.verify(tokenFromUser, jwtKey);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

module.exports = { generateAuthToken, verifyToken };
