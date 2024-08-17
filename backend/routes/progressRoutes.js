const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// Create a new progress
router.post('/progress', async (req, res) => {
    const { user, weight, body_fat, date } = req.body;
    try {
        const progress = new Progress({
            user,
            weight,
            body_fat,
            date,
        });
        await progress.save();
        res.status(201).send(progress);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all progress
router.get('/progress/:userId', async (req, res) => {
    try {
        const progress = await Progress.find({ user: req.params.userId });
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a progress
router.delete('/progress/:id', async (req, res) => {
    try {
        const progressId = req.params.id;
        const progress = await Progress.findByIdAndDelete(progressId);
        if (!progress) {
            return res.status(404).send('Progress not found');
        }
        res.status(200).send(progress);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;