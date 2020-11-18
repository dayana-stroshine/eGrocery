const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res, next ) => {
    const errors = validationResult(req);
    // Check for errors within validation
    if (!errors.isEmpty()) return
    // Extract details
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }
        // Send off the request to the database to create a user
        const result = await User.save(userDetails);

        res.status(201).json({message: 'User is signed up!'})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}