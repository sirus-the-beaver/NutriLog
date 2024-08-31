const mongoose = require('mongoose');

// Create a new schema for the food log
const FoodLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    total_fat: {
        type: Number,
        required: true,
    },
    saturated_fat: {
        type: Number,
        required: true,
    },
    cholesterol: {
        type: Number,
        required: true,
    },
    sodium: {
        type: Number,
        required: true,
    },
    total_carbohydrates: {
        type: Number,
        required: true,
    },
    dietary_fiber: {
        type: Number,
        required: true,
    },
    sugars: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    iron: {
        type: Number,
        required: true,
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const FoodLog = mongoose.model('FoodLog', FoodLogSchema);

module.exports = FoodLog;