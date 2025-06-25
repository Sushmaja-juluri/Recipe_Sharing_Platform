const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } else if (req.method === 'POST') {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};


