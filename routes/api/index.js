const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/recipe', require('./recipe'))

module.exports = router
