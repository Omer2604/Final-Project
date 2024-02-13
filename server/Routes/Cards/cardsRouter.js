const { Card } = require("./cardModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const { generateBizNum } = require("./services/generateBizNum");
const { validateCard } = require("./cardValidation");

router.get("/cards", async (req, res) => {
  try {
    console.log("Getting all cards...");
    const cards = await Card.find();
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright("Error fetching cards:", error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/card/:id", async (req, res) => {
  try {
    console.log(`Getting card with ID: ${req.params.id}`);
    const card = await Card.findOne({ _id: req.params.id });
    if (!card) {
      console.log(`No card found with ID: ${req.params.id}`);
      return res.status(404).send("Card not found.");
    }
    return res.send(card);
  } catch (error) {
    console.log(
      chalk.redBright(
        `Error fetching card with ID: ${req.params.id}. Error:`,
        error.message
      )
    );
    return res.status(500).send(error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz) return res.status(403).json("Un authorize user!");
    const cards = await Card.find({ user_id: user._id });
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user.biz) {
      console.log(
        chalk.redBright("A non biz user attempted to create a card!")
      );
      return res.status(403).json("Un authorize user!");
    }

    let card = req.body;

    const { error } = validateCard(card);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    card = new Card({
      title: card.title,
      description: card.description,
      image: {
        url: card.url
          ? card.url
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: card.alt ? card.alt : "Pic Of Business Card",
      },
      bizNumber: await generateBizNum(),
      user_id: user._id,
    });

    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user.biz) {
      console.log(
        chalk.redBright("A non-business user attempted to create a card!")
      );
      return res.status(403).json("You are not authorize to edit card!");
    }

    let card = req.body;
    delete card._id;
    const { error } = validateCard(card);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    card = {
      title: card.title,
      description: card.description,
      address: card.address,
      phone: card.phone,
      image: {
        url: card.url,
        alt: card.alt,
      },
    };

    const filter = {
      _id: req.params.id,
      userID: user._id,
    };

    card = await Card.findOneAndUpdate(filter, card);
    if (!card) {
      console.log(chalk.redBright("No card with this ID in the database!"));
      return res.status(404).send("No card with this ID in the database!");
    }
    card = await Card.findById(card._id);
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.user;

    console.log(chalk.blueBright("Deleting card request initiated"));
    console.log(
      chalk.greenBright(`User ID: ${user._id}, User Biz: ${user.biz}`)
    );

    if (!user.biz) {
      console.log(
        chalk.redBright("A non-business user attempted to create a card!")
      );
      return res.status(403).json("You are not authorize to delete this card!");
    }

    let card = await Card.findOneAndRemove({
      _id: req.params.id,
    });

    if (!card) {
      console.log(chalk.redBright("Unauthorized user!"));
      return res.status(403).send("You are not authorize to delete cards");
    }

    console.log(chalk.greenBright("Card deleted successfully!"));
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not delete card:", error.message));
    return res.status(500).send(error.message);
  }
});

router.patch("/card-like/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    const cardId = req.params.id;

    const updatedCard = await Card.findOneAndUpdate(
      { _id: cardId },
      { $addToSet: { likes: user._id } },
      { new: true }
    );

    res.send(updatedCard);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
