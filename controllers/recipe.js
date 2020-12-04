const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');

const db = require('../util/database');
const Recipe = require('../models/recipe');

// Create Recipe
exports.addRecipe = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return

  const recipe_name = req.body.recipeName;
  const category = req.body.recipeCategory;
  const instruction = req.body.directions;
  // FIX ME: add in user id
  const user_id = req.body.user_id ? req.body.user_id : 10;


  try {
    const recipeDetails = {
      recipe_name: recipe_name,
      instruction: instruction,
      category: category,
      user_id: user_id
    }

    const result = await Recipe.save(recipeDetails);

    return res.status(201).json(result);
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// Read all recipes by a user
exports.getAll = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return

  const user_id = req.params.userId;

  try {
    const recipeUser = {
      user_id: user_id
    }

    const recipes = await Recipe.getAll(recipeUser);

    return res.status(200).json(recipes)
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// Read one recipe by a user
exports.getOne = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return

  const recipe_id = req.params.recipeId;

  try {
    const recipeId = {
      recipe_id: recipe_id
    }

    const recipe = await Recipe.getOne(recipeId);

    return res.status(200).json(recipe)
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// Read all recipes except from one user 
exports.getRandom = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return

  const user_id = req.params.userId;

  try {
    const recipeUser = {
      user_id: user_id
    }

    const recipes = await Recipe.getRandom(recipeUser);

    return res.status(200).json(recipes)
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// Update recipe
exports.update = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return

  const recipeId = req.params.recipeId;
  const recipe_id = parseInt(recipeId, 10);

  try {
    const [recipe] = await db.query(`SELECT * FROM Recipes WHERE recipe_id = ?`, [recipe_id])

    if (!recipe) {
      return res.status(404).json({
        error: 'No recipe with this recipe_id exists',
      })
    }
    const recipeDetails = {
      recipe_name: req.body.name || recipe[0].recipe_name,
      instruction: req.body.directions || recipe[0].instruction,
      category: req.body.category || recipe[0].category || null,
      satisfaction: req.body.rating || recipe[0].satisfaciton || null,
      recipe_id: recipe_id,
    }
    const result = await Recipe.update(recipeDetails);

    return res.status(201).json({
      message: 'Recipe updated!',
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// Delete a recipe
exports.delete = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return

  const recipe_id = req.params.recipeId;

  try {
    const recipe = {
      recipe_id: recipe_id
    }
    const result = await Recipe.delete(recipe);

    return res.status(200).json({
      message: 'Recipe deleted!'
    })
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

