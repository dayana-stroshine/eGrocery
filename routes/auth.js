const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const router = express.Router();

const authController = require('../controllers/auth');

//--- SERVER SIDE VALIDATION OF INPUT ---//

router.post(
    '/signup', 
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.')
        .custom(async(email) => {
            const user = await User.find(email);
            // Make sure only one email exists for one user
            if (user[0].length > 0) {
                return Promise.reject('Email address already exists.')
            }
        })
        .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
    ], 
    authController.signup
);

module.exports = router;

