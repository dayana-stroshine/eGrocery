const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/recipe', require('./recipe'))
router.use('/ingredient', require('./ingredient'))

module.exports = router
