const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  price: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  image: {
    url: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: true, minlength: 2, maxlength: 256 },
  },
  bizNumber: {
    type: String,
    minlength: 7,
    maxlength: 7,
    required: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;
