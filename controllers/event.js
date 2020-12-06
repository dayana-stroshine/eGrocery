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

// Read all ingredients in a user's calendar
exports.addEventRecipe = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return
  
  const user_id = req.body.user_id;
  const recipe_id = req.body.recipe_id;
  const day = req.body.day;

  try {
    const eventDetails = {
      recipe_id,
      user_id,
      day
    }

    const result = await Events.addEventRecipe(eventDetails);

    return res.status(200).json({message: 'Recipe has been added to calendar!'});
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

// exports.signup = async (req, res, next ) => {
//     const errors = validationResult(req);
//     // Check for errors within validation
//     if (!errors.isEmpty()) return
//     // Extract details
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     try{
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 12)

//         const userDetails = {
//             name: name,
//             email: email,
//             password: hashedPassword
//         }
//         // Send off the request to the database to create a user
//         const result = await User.save(userDetails);

//         res.status(201).json({message: 'User is signed up!'})
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next(err)
//     }
// }
