'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkup = sequelize.define('Checkup', {
    cell: DataTypes.STRING
  }, {})

  Checkup.associate = function(models) {
    Checkup.belongsTo(models.User, {foreignKey: 'UserID', as: 'User'});
    Checkup.belongsTo(models.Checkin, {foreignKey: 'CheckinID', as: 'Checkin'});
  };

  return Checkup;
};
