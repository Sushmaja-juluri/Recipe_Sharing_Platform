const Tomakes = require('../models/tomakesModel');

// ✅ Get all tomakes created by the current user
exports.getAllTomakes = async (req, res) => {
    try {
        const tomakes = await Tomakes.find({ createdBy: req.user.id });
        return res.status(200).send({ tomakes });
    } catch (error) {
        console.error('Error fetching all tomakes:', error.message);
        return res.status(500).send({ error: 'Error fetching all tomakes' });
    }
};

// ✅ Get a single tomake by ID
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

// ✅ Create a new tomake
exports.createTomake = async (req, res) => {
    const title = req.body.title;
    try {
        const newTomake = new Tomakes({
            title,
            createdBy: req.user.id
        });
        const savedTomake = await newTomake.save();
        return res.status(201).send({ newTomake: savedTomake });
    } catch (error) {
        console.error('Error creating tomake:', error.message);
        return res.status(400).send({ error: 'Error creating tomake' });
    }
};

// ✅ Update an existing tomake
exports.updateTomake = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTomake = await Tomakes.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTomake) {
            return res.status(404).send({ error: 'Tomake not found' });
        }
        return res.status(200).send({ updatedTomake });
    } catch (error) {
        console.error('Error updating tomake:', error.message);
        return res.status(400).send({ error: 'Error updating tomake' });
    }
};

// ✅ Delete a tomake
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
