const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prepTime: { type: String },
  ingredients: [String],
  steps: [String],
  image: { type: String }, // path to image file
});

module.exports = mongoose.model("Recipe", recipeSchema);
