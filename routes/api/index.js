const router = require('express').Router()
const users = require('./usersRoute')
const thoughts = require('./thoughtsRoute')

router.use('/users', users)
router.use('/thoughts', thoughts)

module.exports = router
