const mongoose = require('mongoose');

const tomakeSchema = new mongoose.Schema(
  {
    dishName: {
      type: String,
      required: true,
      trim: true,
    },
    prepTime: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: String,
    },
    steps: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel', // Make sure this matches your User model name
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tomakes = mongoose.model('Tomake', tomakeSchema); // model name is singular, capitalized

module.exports = Tomakes;
