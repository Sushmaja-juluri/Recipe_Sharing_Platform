const mongoose = require('mongoose');

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
module.exports = Tomakes;
