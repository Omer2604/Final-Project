const { validateForgotPassword } = require("../middlewares/validation");
const User = require("../Routes/Users/userModel");

const forgotPassword = async (req, res) => {
  console.log("Request body:", req.body);

  const { error } = validateForgotPassword(req.body);
  if (error) {
    console.log("Validation Error:", error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) {
    console.log("User not found");
    return res.status(400).send("User with given email doesn't exist");
  }

  const token = user.generatePasswordResetToken();
  await user.save();
  const storedUser = await User.findById(user._id);
  console.log(
    "Stored resetPasswordExpires in MongoDB:",
    storedUser.resetPasswordExpires
  );
  res.send(token);
};

module.exports = {
  forgotPassword,
};
