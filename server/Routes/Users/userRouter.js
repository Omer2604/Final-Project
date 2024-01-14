const validateRegistration = require("./usersValidations/registraion");
// const validateSignin = require("./usersValidations/signIn");
const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "YourPrivateKeyVer3";

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send({ _id: user._id, name: user.name, email: user.email });
});

module.exports = router;

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) {
    console.log(chalk.redBright(error.details[0].message));
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log(chalk.redBright("Invalid email"));
    return res.status(400).send("Invalid email or password.");
  }

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) {
    console.log(chalk.redBright("Invalid password"));
    return res.status(400).send("Invalid email or password.");
  }

  res.json({
    token: generateAuthToken(user),
  });
});

router.get("/userInfo", auth, (req, res) => {
  let user = req.user;

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.send(user))
    .catch((errorsFromMongoose) => res.status(500).send(errorsFromMongoose));
});

const verifyToken = (token) => {
  try {
    console.log("Verifying token:", token);
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

router.post("/forgotpassword", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Type of Request body:", typeof req.body);

    console.log("Fetching user from the database...");
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!user) {
      console.log("User not found");
      return res.status(400).send("User with the given email doesn't exist");
    }

    console.log("User found with email:", req.body.email);

    const token = user.generatePasswordResetToken();
    console.log("Generated password reset token for user:", user._id);
    console.log("Generated token:", token);
    console.log("Type of generated token:", typeof token);

    console.log("Updating user with new reset token...");
    await user.save();

    // Retrieving the user from the database to confirm the changes
    const updatedUser = await User.findById(user._id);
    console.log("Updated User with new reset token:", updatedUser);

    const responseObj = { resetPasswordToken: token };
    console.log("Response:", responseObj);
    console.log("Type of responseObj:", typeof responseObj);

    res.json(responseObj);
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Type of error:", typeof error);
    if (error.name === "JsonWebTokenError") {
      console.error("JsonWebTokenError identified");
      res.status(401).send("Invalid token");
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

router.post("/reset-password", async (req, res) => {
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  const { password, resetPasswordToken } = req.body;

  if (!password || !resetPasswordToken) {
    console.log("Fields missing", {
      password: !!password,
      resetPasswordToken: !!resetPasswordToken,
    });
    return res.status(400).json({
      success: false,
      message: "Both password and resetPasswordToken are required.",
    });
  }

  try {
    const decodedUser = verifyToken(resetPasswordToken);
    console.log("Decoded User:", decodedUser);

    if (!decodedUser) {
      console.log("Token verification failed.");
      return res.status(400).json({
        success: false,
        message: "Invalid token or token has expired.",
      });
    }

    const user = await User.findById(decodedUser._id);
    console.log("Found User:", user);

    if (!user) {
      console.log("No user found.");
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    user.password = generateHashPassword(password);
    user.resetPasswordToken = undefined; // Clear the resetPasswordToken
    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Server-side error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
});

module.exports = router;
