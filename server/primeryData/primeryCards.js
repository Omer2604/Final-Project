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
      bizNumber: "1000001",
      likes: [],
      user_id: "62362f3767d9d9187ad24fab",
    },
    {
      title: "עוגת לב",
      description: "בטעם בצק שקדים ושוקולד",
      image: {
        url: "http://localhost:3000/assets/images/heartCake.png",
        alt: "עוגת לב",
      },
      bizNumber: "1000002",
      likes: [],
      user_id: "6553a34ee957c7595e08b8a8",
    },
    {
      title: "מקרונים",
      description: "בטעמים שונים",
      image: {
        url: "http://localhost:3000/assets/images/macaroon.png",
        alt: "מקרונים",
      },
      bizNumber: "1000003",
      likes: [],
      user_id: "6553a34ee957c7595e08b8a8",
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
