const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');

const RecipeIngredient = require('../models/recipeIngredient');

// Create Recipe Ingredient relationship
exports.addRecipeIngredient = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const recipe_id = req.body.recipe_id;
    const ingredient_id = req.body.ingredient_id;


    try {
        const details = {
            recipe_id: recipe_id,
            ingredient_id: ingredient_id
        }

        const result = await RecipeIngredient.save(details);

        return res.status(201).json({
            message: 'Recipe/ingredient relation created!',
            id: result.insertId
        })
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


// Delete a recipe ingredient relationship
exports.delete = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const recipe_id = req.params.recipeId;
    const ingredient_id = req.params.ingredientId
  
    try {
        const recipeIngredient = {  
            recipe_id: recipe_id,
            ingredient_id: ingredient_id
        }
        const result = await RecipeIngredient.delete(recipeIngredient);

        return res.status(200).json({
            message: 'Recipe/ingredient relation deleted!'
        })
    }
    catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

