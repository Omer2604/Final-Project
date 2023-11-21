const chalk = require("chalk");
const { verifyToken } = require("../services/token");

function authorizationMiddlware(req, res, next) {
  console.log("Starting authorization middleware...");

  const tokenFromClient = req.header("x-auth-token");
  console.log("Received token from client:", tokenFromClient);

  if (!tokenFromClient) {
    console.log(
      chalk.redBright("Authorization Error: User did not send a token!")
    );
    return res.status(401).json("Please Login");
  }

  const userInfo = verifyToken(tokenFromClient);

  if (!userInfo) {
    console.log(chalk.redBright("Authorization Error: Invalid Token!"));
    return res.status(401).json("Invalid Token!");
  }

  req.user = userInfo;

  console.log("Authorization successful for user:", userInfo._id);
  return next();
}

module.exports = authorizationMiddlware;
