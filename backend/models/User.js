const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcryptjs');

// Create a new schema for the user
const UserSchema = new Schema({
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
    }
})

// Middleware to hash the password before saving it to the database
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
})

// Method to compare the entered password with the hashed password in the database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);