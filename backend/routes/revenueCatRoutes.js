const express = require('express');
const router = express.Router();
const { verifyRevenueCatRequest } = require('../middleware/verifyRevenueCatRequest');
const { handleRevenueCatWebhook } = require('../controllers/revenueCatController');

router.post('/revenueCat', verifyRevenueCatRequest, handleRevenueCatWebhook);

module.exports = router;