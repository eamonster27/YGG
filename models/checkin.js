'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkin = sequelize.define('Checkin', {
    alerts: {
      type: DataTypes.INTEGER,
      validate: {
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        len: [4,12],
        isAlpha: {
          args: true,
          msg: "Letters only."
        },
        notEmpty: {
          args: true,
          msg: "Cannot be empty string."
        }
      }
    },
    lat: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "Numeric only."
        },
        notEmpty: {
          args: true,
          msg: "Cannot be empty string."
        }
      }
    },
    lng: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "Numeric only."
        },
        notEmpty: {
          args: true,
          msg: "Cannot be empty string."
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Cannot be empty string."
        }
      }
    },
    requestStatus: {
      type: DataTypes.STRING,
      validate: {
        len: [7,8],
        isAlpha: {
          args: true,
          msg: "Letters only."
        },
        notEmpty: {
          args: true,
          msg: "Cannot be empty string."
        }
      }
    },
    emContactID: {
      type: DataTypes.INTEGER,
      validate: {
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
    Checkin.belongsTo(models.Checkup, {foreignKey: 'CheckupID', as: 'Checkup'});
    Checkin.hasMany(models.Ping, {foreignKey: 'CheckinID', as: 'Pings'});
  };

  return Checkin;
};
