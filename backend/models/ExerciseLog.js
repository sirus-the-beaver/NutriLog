const mongoose = require('mongoose');

// Create a new schema for the exercise log
const ExerciseLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    minutes: {
        type: Number,
        required: true,
    },
    calories_burned: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});