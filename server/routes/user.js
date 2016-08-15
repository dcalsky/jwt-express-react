const express = require('express')
const router = express.Router()
const model = require('../models')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt');
const User = model.users
const secret = require('../config').secret

router.get('/', (req, res)=>{
  User.findAll().then((result) => {
    res.send(result)
  })
})

router.post('/', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  User.findOne({
    where: {
      username: username
    }
  }).then((user) => {
    if(!user) {
      User
        .build({
          username: username,
          password: password
        })
        .save()
        .then(() => {
          res.send('successful!')
        }).catch(function(e) {
        throw e
      })
    } else {
      res.send('User has already existed!')
    }
  })
})

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  User
    .findOne({
      where: {
        username: username,
        password: password
      }
    })
    .then((user) => {
      if(user) {
        const isAdmin = user.get('admin') ? 'admin' : 'normal'
        const token = jsonwebtoken.sign({
          iss: isAdmin
        }, secret, { // get secret from config
          expiresIn: '1d' // expires in 1 day
        })
        res.json({
          success: true,
          message: 'ok!',
          token: token
        })
      } else {
        res.send('Authentication failed.')
      }
    })
})

router.post('/action1', jwt({secret: secret}), (req, res) => { // normal
  res.send('ok!action1')
})

router.post('/action2', jwt({secret: secret, issuer: 'admin'}), (req, res) => { // admin
  res.send('ok!action2')
})

module.exports = router
