const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Subscription = require('../models/Subscription');

router.post('/revenueCatWebhook', async (req, res) => {
    const event = req.body;

    if (!event || !event.event || !event.payload) {
        return res.status(400).send('Invalid request');
    }

    const { event: eventType, payload } = event;

    try {
        if (eventType === 'SUBSCRIPTION_RENEWED' || eventType === 'SUBSCRIPTION_CANCELLED') {
            const { userId, productId, status } = payload;

            const subscription = await Subscription.findOne({ userId, productId });

            if (subscription) {
                subscription.status = status;
                await subscription.save();
            }

            const purchase = await Purchase.findOne({ userId, productId });
            if (purchase) {
                purchase.status = status;
                await purchase.save();
            }
        }

        res.status(200).send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;