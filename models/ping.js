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
        notNull: {
          args: true,
          msg: "Cannot be null."
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
        notNull: {
          args: true,
          msg: "Cannot be null."
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
        notNull: {
          args: true,
          msg: "Cannot be null."
        },
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
