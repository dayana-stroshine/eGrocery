const express = require('express');
const { body } = require('express-validator');
const router = express.Router()

const Ingredient = require('../../models/ingredient');
const ingredientController = require('../../controllers/ingredient');

router.post(
    '/addIngredient', 
    [
     // FIX ME add validators here for input before data is sent to the database
    ],
    ingredientController.addIngredient
)

module.exports = router;