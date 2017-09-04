'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Pings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lng: {
        type: Sequelize.STRING,
        allowNull: false
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CheckinID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Checkins',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Pings');
  }
};
