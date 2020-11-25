const db = require('../util/database');

module.exports = class Ingredient {
    constructor(ingredient_name, quantity, unit, category) {
        this.ingredient_name = ingredient_name;
        this.quantity = quantity;
        this.category = category;
        this.unit = unit;
    }

    // Return all ingredients for a recipe
    static getRecipeIngredients(recipe_id) {
        return db.execute(
            `SELECT * FROM Ingredients JOIN Recipe_Ingredients
            ON Ingredients.ingredient_id = Recipe_Ingredients.ingredient_id
            WHERE Recipe_Ingredients.recipe_id = (?)`, [recipe_id]);
    }
    
    // FIX ME: Add category 
    // Add Ingredient to the database
    static save(ingredient) {
        return db.execute(
            'INSERT INTO Ingredients (ingredient_name, quantity, unit) VALUES (?, ?, ?)',
            [ingredient.ingredient_name, ingredient.quantity, ingredient.unit]
        );

    }
};