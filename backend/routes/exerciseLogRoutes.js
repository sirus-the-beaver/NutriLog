const express = require('express');
const router = express.Router();
const ExerciseLog = require('../models/ExerciseLog');

// Create a new exercise log
router.post('/exerciseLog', async (req, res) => {
    const { user, exercise, hours, minutes, calories_burned, date } = req.body;
    try {
        const exerciseLog = new ExerciseLog({
            user,
            exercise,
            hours,
            minutes,
            calories_burned,
            date,
        });
        await exerciseLog.save();
        res.status(201).send(exerciseLog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all exercise logs
router.get('/exerciseLog/:userId', async (req, res) => {
    try {
        const exerciseLogs = await ExerciseLog.find({ user: req.params.userId });
        res.status(200).json(exerciseLogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete an exercise log
router.delete('/exerciseLog/:id', async (req, res) => {
    try {
        const exerciseId = req.params.id;
        const exerciseLog = await ExerciseLog.findByIdAndDelete(exerciseId);
        if (!exerciseLog) {
            return res.status(404).send('Exercise log not found');
        }
        res.status(200).send(exerciseLog);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;