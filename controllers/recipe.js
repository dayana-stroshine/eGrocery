const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');

const Recipe = require('../models/recipe');

exports.addRecipe = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const recipe_name = req.body.recipeName;
    const instruction = req.body.directions;
    // FIX ME: add in user id
    const user_id = req.body.user_id ? req.body.user_id : 1;
    // FIX ME: add in category
    // const category = req.body.category

    try {
        const recipeDetails = {
            recipe_name: recipe_name,
            instruction: instruction,
            // category: category,
            user_id: user_id
        }

        const result = await Recipe.save(recipeDetails);

        res.status(201).json({message: 'Recipe created!'})
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}