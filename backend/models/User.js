const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SubscriptionSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,    
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active',
    },
    originalTransactionId: {
        type: String,
        default: null,
    },
    store: {
        type: String,
        enum: ['PLAY_STORE', 'APP_STORE'],
    },
    presentedOfferingId: {
        type: String,
        default: null,
    },
})

// Create a new schema for the user
const UserSchema = new Schema({
    appUserId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscription: [SubscriptionSchema],
})

// Middleware to hash the password before saving it to the database
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Method to compare the entered password with the hashed password in the database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);