const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/recipe', require('./recipe'));
router.use('/ingredient', require('./ingredient'));
router.use('/recipeIngredient', require('./recipeIngredient'));
router.use('/kitchen', require('./kitchen'));
router.use('/event', require('./event'));

module.exports = router;
