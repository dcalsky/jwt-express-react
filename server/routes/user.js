'use strict'

const express       = require('express')
const model         = require('../models')
const jsonwebtoken  = require('jsonwebtoken')
const jwt           = require('express-jwt')
const config        = require('../config')
const getErrorMessage  = require('../utils/message-handle')

const router        = express.Router()
const User          = model.users

// Find all users
// router.get('/', (req, res)=>{
//   User.findAll().then((result) => {
//     res.send(result)
//   })
// })

router.post('/register', (req, res) => {
  const {username, password, email} = req.body
  User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if(!user) {
      User
        .build({
          username: username,
          password: password,
          email: email
        })
        .save()
        .then(() => {
          const token = jsonwebtoken.sign({
            username: username,
            role: config.role.normal, // default is normal
          }, config.token.secret, { // get secret from config
            expiresIn: '1d' // expires in 1 day
          })
          res.json({
            username: username,
            email: email,
            token: token
          })
        }).catch((err) => {
          throw err
      })
    } else {
      res.send('User has already existed!')
    }
  })
})

router.post('/login', (req, res, next) => {
  const {username, password} = req.body
  User
    .findOne({
      where: {
        username: username,
        password: password
      }
    })
    .then((user) => {
      if(user) {
        const roleId = user.get('roleId')
        const token = jsonwebtoken.sign({
          username: username,
          role: roleId,
        }, config.token.secret, { // get secret from config
          expiresIn: config.token.expired // expires in 1 day
        })
        res.json({
          username: username,
          token: token,
          email: user.get('email')
        })
      } else {
        res.json(getErrorMessage(1001))
      }
    })
})

// normal user action
router.post('/action1', jwt({secret: config.token.secret}), (req, res) => { // normal will be ok
  res.json({
    content: 'ok, action1'
  })
})

// admin user action
router.post('/action2', jwt({secret: config.token.secret}), (req, res, next) => { // only for admin
  if(req.user.role === config.role.admin) {
    res.json({
      content: 'ok, action2'
    })
  } else {
    res.json(getErrorMessage(1002))
  }
})

module.exports = router
