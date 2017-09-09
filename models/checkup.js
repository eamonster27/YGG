'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkup = sequelize.define('Checkup', {
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
