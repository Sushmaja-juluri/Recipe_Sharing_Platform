const mongoose = require('mongoose');

const tomakeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true
    }
})


const Tomakes = mongoose.model('tomakes', tomakeSchema)

module.exports = Tomakes;