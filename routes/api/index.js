const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/recipe', require('./recipe'))
router.use('/ingredient', require('./ingredient'))
router.use('/recipeIngredient', require('./recipeIngredient'))

module.exports = router
