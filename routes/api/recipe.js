const express = require('express');
const { body } = require('express-validator');
const router = express.Router()

const Recipe = require('../../models/recipe');
const recipeController = require('../../controllers/recipe');

router.post(
    '/addRecipe', 
    [
     // FIX ME add validators here for input before data is sent to the database
    ],
    recipeController.addRecipe
)

module.exports = router;