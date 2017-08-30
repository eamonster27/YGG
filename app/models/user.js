'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    cell: DataTypes.STRING,
    passcode: DataTypes.STRING,
    paniccode: DataTypes.STRING
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Checkin, {foreignKey: 'UserID', as: 'Checkins'});
    User.hasMany(models.Checkup, {foreignKey: 'UserID', as: 'Checkups'});
  };

  return User;
};
