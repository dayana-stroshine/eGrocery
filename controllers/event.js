const { validationResult } = require('express-validator');

const Events = require('../models/event');

// Read all ingredients in a user's calendar
exports.getAll = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return
  
  // FIX ME: add in user id
  const user_id = req.params.userId;

  try {
    const eventUser = {
      user_id: user_id
    }

    const eventRecipes = await Events.getAll(eventUser);

    return res.status(200).json(eventRecipes)
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
