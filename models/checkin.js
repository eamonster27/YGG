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
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Dont forget the address.'
        }
      }
    },
    lat: {
      type: DataTypes.STRING,
      validate: {
        isFloat: {
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
        isFloat: {
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
      type: DataTypes.DATE,
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
