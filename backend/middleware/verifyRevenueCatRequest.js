const verifyRevenueCatRequest = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const expectedToken = process.env.REVENUECAT_AUTH_TOKEN;

    if (!token || token !== expectedToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

module.exports = { verifyRevenueCatRequest };