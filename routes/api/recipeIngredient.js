const express = require('express');
const { body } = require('express-validator');
const router = express.Router()

const RecipeIngredeint = require('../../models/recipeIngredient');
const recipeIngredientController = require('../../controllers/recipeIngredient');

// Create a recipe ingredient relationship
router.post('/', recipeIngredientController.addRecipeIngredient)

// Delete a recipe
router.delete('/:recipeId/:ingredientId', recipeIngredientController.delete)

module.exports = router;