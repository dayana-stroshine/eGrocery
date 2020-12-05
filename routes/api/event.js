const express = require('express');
const router = express.Router();

const eventController = require('../../controllers/event');

// Read all recipes in a user's calendar
router.get('/:userId', eventController.getAll);

module.exports = router;
