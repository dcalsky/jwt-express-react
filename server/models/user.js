module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define("users", {
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
  });
  User.associate = function(models) {
    User.belongsTo(models.roles, {
      foreignKey: {
        allowNull: false,
        defaultValue: 1
      }
    });
  };
  User.prototype.toJSON = function() {
    let values = this.get();
    delete values.password;
    return values;
  };
  return User;
};
