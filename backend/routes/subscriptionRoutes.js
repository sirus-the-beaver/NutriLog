const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Create a new subscription
router.post('/subscription', async (req, res) => {
    try {
        const subscription = new Subscription(req.body);
        await subscription.save();
        res.status(201).send(subscription);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all subscriptions
router.get('/subscriptions/:userId', async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ userId: req.params.userId });
        res.status(200).send(subscriptions);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;