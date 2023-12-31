require("./DB/connectToDb");
// require("./primeryData/primeryCards")();
const express = require("express");
const app = express();

const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/newpassword/:YourPrivateKeyVer3", (req, res) => {
  res.render("newpassword");
});

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);
