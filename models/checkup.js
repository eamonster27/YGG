'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkup = sequelize.define('Checkup', {
    reqUserName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,30],
          msg: "Must be between 2 and 30 characters."
        },
        isAlpha: {
          args: true,
          msg: "Letters only, please."
        },
        notEmpty: {
          args: true,
          msg: 'You have a first name.'
        }
      }
    },
    reqUserID: {
      type: DataTypes.INTEGER,
      validate: {
        notThisUser(value) {
          if (value == this.UserID) {
            throw new Error('You cannot be your own Emergency Contact!')
          }
        }
      }
    }
  }, {})

  Checkup.associate = function(models) {
    Checkup.belongsTo(models.User, {foreignKey: 'UserID', as: 'User'});
    Checkup.hasOne(models.Checkin, {foreignKey: 'CheckupID', as: 'Checkin'});
  };

  return Checkup;
};

//Maybe make alert a key value pair with index and string description.
