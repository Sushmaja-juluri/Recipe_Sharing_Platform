const Tomakes = require('../models/tomakesModel');

// GET all recipes
exports.getAllTomakes = async (req, res) => {
  try {
    const tomakes = await Tomakes.find({ createdBy: req.user._id });
    return res.status(200).send({ recipes: tomakes });
  } catch (error) {
    return res.status(500).send({ error: 'Error fetching recipes' });
  }
};

// GET one
exports.getTomakeById = async (req, res) => {
  try {
    const tomake = await Tomakes.findById(req.params.id);
    if (!tomake) return res.status(404).send({ error: 'Recipe not found' });
    return res.status(200).send({ recipe: tomake });
  } catch (error) {
    return res.status(500).send({ error: 'Error fetching recipe' });
  }
};

// CREATE
exports.createTomake = async (req, res) => {
  const { dishName, prepTime, ingredients, steps } = req.body;
  try {
    const newRecipe = new Tomakes({
      dishName,
      prepTime,
      ingredients,
      steps,
      createdBy: req.user._id,
    });
    const saved = await newRecipe.save();
    return res.status(201).send({ newRecipe: saved });
  } catch (error) {
    return res.status(400).send({ error: 'Error creating recipe' });
  }
};

// UPDATE
exports.updateTomake = async (req, res) => {
  try {
    const updated = await Tomakes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).send({ error: 'Recipe not found' });
    return res.status(200).send({ updatedRecipe: updated });
  } catch (error) {
    return res.status(400).send({ error: 'Error updating recipe' });
  }
};

// DELETE
exports.deleteTomake = async (req, res) => {
  try {
    const deleted = await Tomakes.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ error: 'Recipe not found' });
    return res.status(200).send({ message: 'Recipe deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: 'Error deleting recipe' });
  }
};
