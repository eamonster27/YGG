'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ping = sequelize.define('Ping', {
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
    }
  }, {})

  Ping.associate = function(models) {
    Ping.belongsTo(models.Checkin, {foreignKey: 'CheckinID', as: 'Checkin'});
  };


  return Ping;
};
