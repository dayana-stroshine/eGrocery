const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');

const Ingredient = require('../models/ingredient');

exports.addIngredient = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    // Create array of ingredient objects
    const ingredient_name = req.body.name;
    const quantity = req.body.quantity;
    const unit = req.body.unit;
    // FIX ME: add in category
    // const category = req.body.category

    try {
        const ingredientDetails = {
            ingredient_name: ingredient_name,
            quantity: quantity,
            // category: category,
            unit: unit
        }

        const result = await Ingredient.save(ingredientDetails);

        return res.status(201).json({
            // message: 'Ingredient created!',
            id: result.insertId,
            status: true,
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}