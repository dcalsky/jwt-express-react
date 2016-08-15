'use strict'

const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const config    = require('../config');
const env       = process.env.NODE_ENV || "development";
//var config    = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  dialect: 'postgres',
  timezone: '+08:00',
  native: true,
  define: {
    timestamps: false
  }
});

sequelize.sync()

let db        = {};

// Change to true to update the model in the database.
// NOTE: This will erase your data.

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;