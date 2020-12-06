const { NO_ERRORS_SCHEMA } = require('@angular/core');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    // Check for errors within validation
    if (!errors.isEmpty()) return
    // Extract details
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        };
        // Send off the request to the database to create a user
        const result = await User.save(userDetails);

        res.status(201).json({ message: 'User is signed up!' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Send off the request to the database to get a user with entered email
        const user = await User.find(email);
        // Throw error if no results are found
        if (user[0].length !== 1) {
            const error = new Error('No user with this email exists.');
            error.statusCode = 401;
            throw error;
        }
        // This is the user details from the database
        const userDetails = user[0][0]
   
        const isMatch = await bcrypt.compare(password, userDetails.password, function (err, response) {
            if (err) {
                const error = new Error('Incorrect password.');
                error.statusCode = 401;
                throw error;
            }
            if (response) {
                // Send JWT
                const token = jwt.sign(
                    {
                        email: userDetails.email,
                        userId: userDetails.user_id,
                    },
                    'secretfortoken',
                    { expiresIn: '1d' }
                );
                return res.status(200).json({ token: token, userId: userDetails.user_id });
            } else {
                // response is OutgoingMessage object that server response http request
                return res.json({ success: false, message: 'passwords do not match' });
            }
        });
        // res.status(200).json({ token: token, userId: userDetails.user_id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
};

exports.delete = async (req, res, next) => {
    const user_id = req.params.userId;
    console.log(user_id);
    try {
        const user = {
            user_id: user_id
        }
        // Send off the request to the database to remove a user
        const result = await User.delete(user);

        res.status(200).json({ message: 'User has been removed.' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}