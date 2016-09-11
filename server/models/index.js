'use strict'

const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const config    = require('../config');
const env       = process.env.NODE_ENV || "development";

let db        = {};

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  dialect: 'postgres',
  timezone: '+08:00',
  native: true,
  define: {
    timestamps: false
  }
});

sequelize.sync()

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// Check whether table of role is empty.
db['roles'].findAll()
  .then((results) => {
    if(results.length === 0) { // If Role if empty, add two records into it to avoid error.
      db['roles'].create({name: 'admin'}) //  role of admin
      db['roles'].create({name: 'normal'}) // role of normal user
    }
  })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;