'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkin = sequelize.define('Checkin', {
    status: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    time: DataTypes.STRING,
    emCell: DataTypes.STRING,
    requestStatus: DataTypes.STRING
  }, {})

  Checkin.associate = function(models) {
    Checkin.belongsTo(models.User, {foreignKey: 'UserID', as: 'User'});
    Checkin.hasMany(models.Ping, {foreignKey: 'CheckinID', as: 'Pings'});
    Checkin.hasOne(models.Checkup, {foreignKey: 'CheckupID', as: 'Checkup'});
  };

  return Checkin;
};
