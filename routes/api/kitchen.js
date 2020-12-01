const express = require('express');
const router = express.Router();

const kitchenController = require('../../controllers/kitchen');

// Read all ingredients in a user's kitchen
router.get('/:userId', kitchenController.getAll);

module.exports = router;
