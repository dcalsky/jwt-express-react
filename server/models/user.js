'use strict'

module.exports = (sequelize, DataTypes) => {
  let User =  sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [4, 16]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6, 16]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.roles, {
          foreignKey: {
            allowNull: false,
            defaultValue: 1
          }
        });
      }
    },
    // Remove the password column
    instanceMethods: {
      toJSON: function () {
        let values = this.get();
        delete values.password
        return values;
      }
    }
  })
  return User
};