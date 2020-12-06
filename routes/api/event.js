const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const eventController = require('../../controllers/event');

// Read all recipes in a user's calendar
router.get('/:userId', eventController.getAll);

// Add an event with a recipe to user's calendar
router.post(
  '/addEventRecipe',
  [
    body('recipe_id').trim().not().isEmpty(),
    body('user_id').trim().not().isEmpty(), 
    body('day').trim().not().isEmpty()
  ],
  eventController.addEventRecipe
);

module.exports = router;
