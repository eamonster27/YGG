'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkin = sequelize.define('Checkin', {
    status: {
      type: DataTypes.STRING,
      validate: {
        len: [4,12],
        isAlpha: true,
        allowNull: false
      }
    },
    lat: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        allowNull: false
      }
    },
    lng: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        allowNull: false
      }
    },
    time: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    requestStatus: {
      type: DataTypes.STRING,
      validate: {
        len: [7,8],
        isAlpha: true,
        allowNull: false
      }
    },
    emContactID: {
      type: DataTypes.INTEGER,
      validate: {
        allowNull: false,
        notThisUser(value) {
          if (value === this.UserID) {
            throw new Error('You cannot be your own Emergency Contact!')
          }
        }
      }
    }
  }, {})

  Checkin.associate = function(models) {
    Checkin.belongsTo(models.User, {foreignKey: 'UserID', as: 'User'});
    Checkin.hasMany(models.Ping, {foreignKey: 'CheckinID', as: 'Pings'});
    Checkin.hasOne(models.Checkup, {foreignKey: 'CheckinID', as: 'Checkup'});
  };

  return Checkin;
};
