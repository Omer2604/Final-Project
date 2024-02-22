const { Card } = require("../Routes/Cards/cardModel");
const User = require("../Routes/Users/userModel");
const chalk = require("chalk");
const { generateHashPassword } = require("../services/bcrypt");

const data = {
  users: [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      biz: true,
      isAdmin: true,
    },
  ],
  cards: [
    {
      title: "סופגניות בטעמים שונים",
      description: "25.10.24-2.1.25",
      image: {
        url: "http://localhost:3000/assets/images/donats.png",
        alt: "סופגניות",
      },
      bizNumber: "1",
      likes: [],
      user_id: "621f3f27dde069e62aa3bcab",
    },
    {
      title: "עוגת לב",
      description: "בטעם בצק שקדים ושוקולד",
      image: {
        url: "http://localhost:3000/assets/images/heartCake.png",
        alt: "עוגת לב",
      },
      bizNumber: "2",
      likes: [],
      user_id: "621f3f27dde069e62aa3bcab",
    },
    {
      title: "מקרונים",
      description: "בטעמים שונים",
      image: {
        url: "http://localhost:3000/assets/images/macaroon.png",
        alt: "מקרונים",
      },
      bizNumber: "3",
      likes: [],
      user_id: "621f3f27dde069e62aa3bcab",
    },
  ],
};

async function primaryUsers() {
  for (const user of data.users) {
    if (await User.findOne({ email: user.email })) {
      console.log(`User with email ${user.email} already exists.`);
      continue;
    }
    try {
      const newUser = new User(user);
      newUser.password = generateHashPassword(user.password);
      await newUser.save();
      console.log(`User ${user.email} added successfully.`);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
}

async function primaryCards() {
  for (const card of data.cards) {
    try {
      const newCard = new Card(card);
      await newCard.save();
      console.log(`Card ${card.title} added successfully.`);
    } catch (error) {
      console.log(chalk.redBright(error.message));
    }
  }
}

async function primaryData() {
  await primaryUsers();
  await primaryCards();
}

primaryData().then(() => console.log("Primary data insertion completed."));
