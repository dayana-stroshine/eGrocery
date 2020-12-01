const db = require('../util/database');

module.exports = class RecipeIngredient {
    constructor(recipe_id, ingredient_id) {
        this.recipe_id = recipe_id;
        this.ingredient_id = ingredient_id;
    }

    // Add Recipe Ingredient relation to the database
    static save(relation) {
        return db.execute(
            'INSERT INTO Recipe_Ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
            [relation.recipe_id, relation.ingredient_id]
        );
    }

     // Delete Recipe Ingredient relation
     static delete(relation) {
        return db.execute(
            'DELETE FROM Recipe_Ingredients WHERE recipe_id= ? AND ingredient_id = ?',
            [relation.recipe_id, relation.ingredient_id]
        );
    }

};