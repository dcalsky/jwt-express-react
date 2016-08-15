'use strict'

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  });
};