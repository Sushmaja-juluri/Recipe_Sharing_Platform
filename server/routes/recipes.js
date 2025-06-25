const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // adjust path

const multer = require('multer');
// GET all recipes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder to store images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }

});

const upload = multer({ storage });
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes); // send as array
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, prepTime, ingredients, steps } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const recipe = new Recipe({
      name,
      prepTime,
      ingredients: ingredients.split(',').map(i => i.trim()),
                              steps: steps.split('\n').map(s => s.trim()),
                              image: imagePath,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add recipe' });
  }
});
module.exports = router;
