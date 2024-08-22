const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

// Middleware to validate the user input
const validateUser = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware to validate login
const validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Register a new user
router.post('/register', validateUser, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });

        // If the user exists, return an error
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        // Create a token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) throw error;
                res.json({ token, userId: user.id });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Login a user
router.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });

        // If the user does not exist, return an error
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await user.matchPassword(password);

        // If the password is incorrect, return an error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        // Create a token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) throw error;
                res.json({ token: token, userId: user.id });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.delete('/deleteAccount', auth, async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('User deleted');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;