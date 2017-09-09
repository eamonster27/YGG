'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkup = sequelize.define('Checkup', {
    alerts: {
      type: DataTypes.INTEGER,
      validate: {
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
    Checkup.belongsTo(models.Checkin, {foreignKey: 'CheckinID', as: 'Checkin'});
  };

  return Checkup;
};

//Maybe make alert a key value pair with index and string description.
