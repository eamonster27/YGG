'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Checkups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alerts: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reqUserID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      UserID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
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
    return queryInterface.dropTable('Checkups');
  }
};
