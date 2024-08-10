const mongoose = require('mongoose');

// Create a new schema for the subscription
const SubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    planId: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Expired'],
        default: 'Active',
    },
    receipt: {
        type: String,
        required: true,
    },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;