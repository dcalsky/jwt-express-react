'use strict'

const express = require('express')
const router  = express.Router()

const userRouter = require('./user.js')

router.use('/user', userRouter)

module.exports = router
