'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Checkins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
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
      requestStatus: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emContactID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
    return queryInterface.dropTable('Checkins');
  }
};
