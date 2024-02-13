const bcrypt = require("bcryptjs");

function generateHashPassword(pass) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}

function comparePassword(password, anotherPassword) {
  return bcrypt.compareSync(password, anotherPassword);
}

module.exports = { generateHashPassword, comparePassword };
