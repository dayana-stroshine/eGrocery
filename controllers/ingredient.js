const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');

const db = require('../util/database');
const Ingredient = require('../models/ingredient');

exports.addIngredient = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    // Create array of ingredient objects
    const ingredient_name = req.body.name;
    const quantity = req.body.quantity;
    const unit = req.body.unit;
    const category = req.body.category;

    try {
        const ingredientDetails = {
            ingredient_name: ingredient_name,
            quantity: quantity,
            category: category,
            unit: unit
        }

        const result = await Ingredient.save(ingredientDetails);

        return res.status(201).json(result)
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// Update ingredient
exports.update = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const ingredientId = req.params.ingredientId;
    const ingredient_id = parseInt(ingredientId, 10);

    try {
        const [ingredient] = await db.query(`SELECT * FROM Ingredients WHERE ingredient_id = ?`, [ingredient_id])

        if (!ingredient) {
            return res.status(404).json({
                error: 'No ingredient with this ingredient_id exists',
            })
        }
        const ingredientDetails = {
            ingredient_name: req.body.name || ingredient[0].ingredient_name,
            quantity: req.body.quantity || ingredient[0].quantity,
            unit: req.body.unit || ingredient[0].unit || null,
            category: req.body.category || ingredient[0].category || null,
            ingredient_id: ingredient_id
        }
        const result = await Ingredient.update(ingredientDetails);

        return res.status(201).json(result)
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// Delete ingredient
exports.deleteIngredient = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const ingredient_id = req.params.ingredientId;

    try {
        const ingredient = {
            ingredient_id: ingredient_id
        }
        const result = await Ingredient.delete(ingredient);

        return res.status(200).json({
            message: 'Ingredient deleted!'
        })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}