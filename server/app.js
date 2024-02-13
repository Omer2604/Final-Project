require("dotenv").config();
require("./DB/connectToDb");
const express = require("express");
const app = express();
const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const chalk = require("chalk");

app.use(
  morgan((tokens, req, res) => {
    return chalk.blue(
      [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  })
);

app.use(
  morgan(":method :url :status :response-time ms", {
    stream: { write: (msg) => console.log(msg) },
  })
);

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/newpassword/:resetToken", (req, res) => {
  const resetToken = req.params.resetToken;
  res.render("newpassword", { resetToken });
});

const PORT = process.env.PORT || 8181;
app.listen(PORT, () =>
  console.log(chalk.blue.bold(`Server running on: http://localhost:${PORT}`))
);

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});
