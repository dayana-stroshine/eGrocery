const { validationResult } = require('express-validator');

const Kitchen = require('../models/kitchen');

// Read all ingredients in a user's kitchen
exports.getAll = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return
  
  // FIX ME: add in user id
  const user_id = req.params.userId;

  try {
    const kitchenUser = {
      user_id: user_id
    }

    const kitchenIngredients = await Kitchen.getAll(kitchenUser);

    return res.status(200).json(kitchenIngredients)
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
