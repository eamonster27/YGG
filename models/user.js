'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: [2,30],
        isAlpha: true,
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        len: [2,30],
        isAlpha: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,50],
        isEmail: true
      }
    },
    cell: {
      type: DataTypes.STRING,
      validate: {
        len: [10,10],
        isNumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,25]
      }
    },
    passcode: {
      type: DataTypes.STRING,
      validate: {
        len: [4,4],
        isNumeric: true
      }
    },
    paniccode: {
      type: DataTypes.STRING,
      validate: {
        len: [4,4],
        isNumeric: true,
        notPasscode(value) {
          if (value === this.passcode) {
            throw new Error('Cannot be the same as your passcode!')
          }
        }
      }
    }
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Checkin, {foreignKey: 'UserID', as: 'Checkins'});
    User.hasMany(models.Checkup, {foreignKey: 'UserID', as: 'Checkups'});
  };

  return User;
};
