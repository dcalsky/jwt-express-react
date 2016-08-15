'use strict'

module.exports = (sequelize, DataTypes) => {
  let Role =  sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [3, 16]
    },
  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.users)
      }
    }
  });
  return Role
}
