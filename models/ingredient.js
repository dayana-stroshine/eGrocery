const db = require('../util/database');

module.exports = class Ingredient {
    constructor(ingredient_id, ingredient_name, quantity, unit, category) {
        this.ingredient_id = ingredient_id
        this.ingredient_name = ingredient_name;
        this.quantity = quantity;
        this.category = category;
        this.unit = unit;
    }

    // Add Ingredient to the database
    static save(ingredient) {
        return db.execute(
            'INSERT INTO Ingredients (ingredient_name, quantity, category, unit) VALUES (?, ?, ?, ?)',
            [ingredient.ingredient_name, ingredient.quantity, ingredient.category, ingredient.unit]
        );
    }

    // Update Ingredient 
    static update(ingredient) {
        return db.execute(
            `UPDATE Ingredients
                SET ingredient_name = ?,
                    quantity = ?,
                    category = ?,
                    unit = ?
                WHERE ingredient_id = ?`,
            [ingredient.ingredient_name, ingredient.quantity, ingredient.category, ingredient.unit, ingredient.ingredient_id]
        );
    }

     // Delete an ingredient
     static delete(ingredient) {
        return db.execute(
            'DELETE FROM Ingredients WHERE ingredient_id = ?',
            [ingredient.ingredient_id]
        );
    }

};