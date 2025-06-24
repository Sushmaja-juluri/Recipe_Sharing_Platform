const Tomakes = require('../models/tomakesModel');

// GET all recipes
exports.getAllTomakes = async (req, res) => {
    try {
        const tomakes = await Tomakes.find({ createdBy: req.user._id });
        return res.status(200).send({ tomakes });
    } catch (error) {
        console.error('Error fetching all tomakes:', error.message);
        return res.status(500).send({ error: 'Error fetching all tomakes' });
    }
};

// GET a single recipe by ID
exports.getTomakeById = async (req, res) => {
    const id = req.params.id;
    try {
        const tomake = await Tomakes.findById(id);
        if (!tomake) {
            return res.status(404).send({ error: 'Tomake not found' });
        }
        return res.status(200).send({ tomake });
    } catch (error) {
        console.error('Error fetching tomake:', error.message);
        return res.status(500).send({ error: 'Error fetching tomake' });
    }
};

// CREATE a new recipe
exports.createTomake = async (req, res) => {
    const { title } = req.body;
    try {
        const newTomake = new Tomakes({ title, createdBy: req.user._id });
        const savedTomake = await newTomake.save();
        return res.status(201).send({ newTomake: savedTomake });
    } catch (error) {
        console.error('Error creating tomake:', error.message);
        return res.status(400).send({ error: 'Error creating tomake' });
    }
};

// UPDATE a recipe by ID
exports.updateTomake = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTomake = await Tomakes.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTomake) {
            return res.status(404).send({ error: 'Tomake not found' });
        }
        return res.status(200).send({ updatedTomake });
    } catch (error) {
        console.error('Error updating tomake:', error.message);
        return res.status(400).send({ error: 'Error updating tomake' });
    }
};

// DELETE a recipe by ID
exports.deleteTomake = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTomake = await Tomakes.findByIdAndDelete(id);
        if (!deletedTomake) {
            return res.status(404).send({ error: 'Tomake not found' });
        }
        return res.status(200).send({ message: 'Tomake deleted successfully' });
    } catch (error) {
        console.error('Error deleting tomake:', error.message);
        return res.status(500).send({ error: 'Error deleting tomake' });
    }
};
