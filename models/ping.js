'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ping = sequelize.define('Ping', {
    lat: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: "Numeric only."
        },
        min: {
          args: -90,
          msg: "Must be greater than or equal to -90."
        },
        max: {
          args: 90,
          msg: "Must be less than or equal to 90."
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
        min: {
          args: -180,
          msg: "Must be greater than or equal to -180."
        },
        max: {
          args: 180,
          msg: "Must be less than or equal to 180."
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
    }
  }, {})

  Ping.associate = function(models) {
    Ping.belongsTo(models.Checkin, {foreignKey: 'CheckinID', as: 'Checkin'});
  };


  return Ping;
};
