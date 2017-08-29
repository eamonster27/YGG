'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ping = sequelize.define('Ping', {
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    time: DataTypes.STRING
  }, {})

  Ping.associate = function(models) {
    Ping.belongsTo(models.Checkin, {foreignKey: 'CheckinID', as: 'Checkin'});
  };


  return Ping;
};
