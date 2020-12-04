const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Recipe = require('../../models/recipe');
const recipeController = require('../../controllers/recipe');
// const auth = require('../../middleware/auth');

// Create a recipe
router.post(
    '/addRecipe',
    [
        // FIX ME add validators here for input before data is sent to the database
    ],
    recipeController.addRecipe
);

// Read all recipes by a user
router.get('/:userId', recipeController.getAll);

// Read one recipe from a user
router.get('/getOne/:recipeId', recipeController.getOne);

// Get random recipes
router.get('/random/:userId', recipeController.getRandom);

// Update a recipe
router.patch('/:recipeId', recipeController.update);

// Delete a recipe
router.delete('/:recipeId', recipeController.delete);

module.exports = router;