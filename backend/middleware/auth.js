const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify the token
module.exports = function(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if there is a token
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};