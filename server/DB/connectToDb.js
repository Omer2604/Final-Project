const mongoose = require("mongoose");
const chalk = require("chalk");
const debug = require("debug")("app:server");

mongoose
  .connect("mongodb://localhost/business_card_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.magentaBright.bold("Connected to MongoDB!"));
  })
  .catch((error) => {
    console.error(
      chalk.redBright.bold(`Error connecting to MongoDB: ${error}`)
    );
    process.exit(1);
  });

debug("Server is running");
