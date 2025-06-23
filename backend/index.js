// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_ENDPOINT}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
});

// Define Schema
const tomakeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Tomakes = mongoose.model('tomakes', tomakeSchema);

// GET all tomakes
app.get('/tomakes', async (req, res) => {
    try {
        const tomakes = await Tomakes.find();
        res.status(200).send({ tomakes });
    } catch (error) {
        console.error('Error fetching all tomakes:', error.message);
        res.status(500).send({ error: 'Error fetching all tomakes' });
    }
});

// GET a tomake by ID
app.get('/tomakes/:id', async (req, res) => {
    try {
        const tomake = await Tomakes.findById(req.params.id);
        if (!tomake) return res.status(404).send({ error: 'Tomake not found' });
        res.status(200).send({ tomake });
    } catch (error) {
        console.error('Error fetching tomake:', error.message);
        res.status(500).send({ error: 'Error fetching tomake' });
    }
});

// POST create new tomake
app.post('/tomakes', async (req, res) => {
    try {
        const { title, completed } = req.body;
        const newTomake = new Tomakes({ title, completed });
        await newTomake.save();
        res.status(201).send({ newTomake });
    } catch (error) {
        console.error('Error creating tomake:', error.message);
        res.status(500).send({ error: 'Error creating tomake' });
    }
});

// PUT update tomake by ID
app.put('/tomakes/:id', async (req, res) => {
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
});

// DELETE tomake by ID
app.delete('/tomakes/:id', async (req, res) => {
    try {
        const deletedTomake = await Tomakes.findByIdAndDelete(req.params.id);
        if (!deletedTomake) return res.status(404).send({ error: 'Tomake not found' });
        res.status(200).send({ message: 'Tomake deleted successfully', deletedTomake });
    } catch (error) {
        console.error('Error deleting tomake:', error.message);
        res.status(500).send({ error: 'Error deleting tomake' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
