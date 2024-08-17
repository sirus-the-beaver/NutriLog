const express = require('express');
const router = express.Router();
const FoodLog = require('../models/FoodLog');

// Create a new food log
router.post('/foodLog', async (req, res) => {
    const { user, food, calories, total_fat, saturated_fat, cholesterol, sodium, total_carbohydrates, dietary_fiber, sugars, protein, iron, date } = req.body;
    try {
        const foodLog = new FoodLog({
            user,
            food,
            calories,
            total_fat,
            saturated_fat,
            cholesterol,
            sodium,
            total_carbohydrates,
            dietary_fiber,
            sugars,
            protein,
            iron,
            date,
        });
        await foodLog.save();
        res.status(201).send(foodLog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all food logs
router.get('/foodLog/:userId', async (req, res) => {
    try {
        const foodLogs = await FoodLog.find({ user: req.params.userId });
        res.status(200).json(foodLogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a food log
router.delete('/foodLog/:id', async (req, res) => {
    try {
        const foodId = req.params.id;
        console.log(foodId);
        const foodLog = await FoodLog.findByIdAndDelete(foodId);
        if (!foodLog) {
            return res.status(404).send('Food log not found');
        }
        res.status(200).send(foodLog);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;