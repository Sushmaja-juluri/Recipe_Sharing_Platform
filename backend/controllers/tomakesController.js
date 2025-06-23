const Tomakes=require('../models/tomakesModel')
exports.getAllTomakes =async (req, res) => {
    try {
        const tomakes = await Tomakes.find();
        res.status(200).send({ tomakes });
    } catch (error) {
        console.error('Error fetching all tomakes:', error.message);
        res.status(500).send({ error: 'Error fetching all tomakes' });
    }
};

exports.getTomakeById=async (req, res) => {
    try {
        const tomake = await Tomakes.findById(req.params.id);
        if (!tomake) return res.status(404).send({ error: 'Tomake not found' });
        res.status(200).send({ tomake });
    } catch (error) {
        console.error('Error fetching tomake:', error.message);
        res.status(500).send({ error: 'Error fetching tomake' });
    }
};


exports.createTomake=async (req, res) => {
    try {
        const { title, completed } = req.body;
        const newTomake = new Tomakes({ title, completed });
        await newTomake.save();
        res.status(201).send({ newTomake });
    } catch (error) {
        console.error('Error creating tomake:', error.message);
        res.status(500).send({ error: 'Error creating tomake' });
    }
};



exports.updateTomake=async (req, res) => {
    try {
        const { title, completed } = req.body;
        const updatedTomake = await Tomakes.findByIdAndUpdate(
            req.params.id,
            { title, completed },
            { new: true, runValidators: true }
        );
        if (!updatedTomake) return res.status(404).send({ error: 'Tomake not found' });
        res.status(200).send({ updatedTomake });
    } catch (error) {
        console.error('Error updating tomake:', error.message);
        res.status(500).send({ error: 'Error updating tomake' });
    }
};


exports.deleteTomake=async (req, res) => {
    try {
        const deletedTomake = await Tomakes.findByIdAndDelete(req.params.id);
        if (!deletedTomake) return res.status(404).send({ error: 'Tomake not found' });
        res.status(200).send({ message: 'Tomake deleted successfully', deletedTomake });
    } catch (error) {
        console.error('Error deleting tomake:', error.message);
        res.status(500).send({ error: 'Error deleting tomake' });
    }
};
