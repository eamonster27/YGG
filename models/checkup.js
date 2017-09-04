'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkup = sequelize.define('Checkup', {
    alerts: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: "Cannot be null."
        }
      }
    },
    reqUserID: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: "Cannot be null."
        },
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
