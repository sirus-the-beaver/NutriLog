const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// Create a new purchase
router.post('/purchase', async (req, res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).send(purchase);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all purchases
router.get('/purchases/:userId', async (req, res) => {
    try {
        const purchases = await Purchase.find({ userId: req.params.userId });
        res.status(200).send(purchases);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;