'use strict'

const express = require('express')
const router = express.Router()
const model = require('../models')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('express-jwt')
const User = model.users
const config = require('../config')

router.get('/', (req, res)=>{
  User.findAll().then((result) => {
    res.send(result)
  })
})

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
          }, config.secret, { // get secret from config
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

router.post('/login', (req, res) => {
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
        }, config.secret, { // get secret from config
          expiresIn: '1d' // expires in 1 day
        })
        res.json({
          username: username,
          token: token,
          email: user.get('email')
        })
      } else {
        res.send('Authentication failed')
      }
    })
})

router.post('/action1', jwt({secret: config.secret}), (req, res) => { // normal will be ok
  res.send('ok!action1')
})

router.post('/action2', jwt({secret: config.secret}), (req, res) => { // only for admin
  if(req.user.role === config.role.admin) {
    res.send('hello! admin')
  } else {
    res.send('Authentication failed')
  }
})

module.exports = router
