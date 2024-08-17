const mongoose = require('mongoose');

// Create a new schema for the progress
const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    body_fat: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = Progress;