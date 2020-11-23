const db = require('../util/database');

module.exports = class Recipe {
    constructor(recipe_name, instruction, category, satisfaction, user_id) {
        this.recipe_name = recipe_name;
        this.instruction = instruction;
        this.category = category;
        this.satisfaction = satisfaction;
        this.user_id = user_id;
    }

    // Return all recipes by a user
    static getAll(user) {
        return db.execute(
            'SELECT * FROM Recipes WHERE user_id = ?', [user]);
    }
    
    // FIX ME: Add category feature
    // Add recipe to the database
    static save(recipe) {
        return db.execute(
            'INSERT INTO Recipes (recipe_name, instruction, user_id) VALUES (?, ?, ?)',
            [recipe.recipe_name, recipe.instruction, recipe.user_id]
        );

    }
};