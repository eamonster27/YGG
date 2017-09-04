'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkups', [{
      alerts: 1, //pings, snooze, disable, home, approved, declined, etc.
      reqUserID: 1,
      UserID: 2,
      CheckinID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 0,
      reqUserID: 1,
      UserID: 6,
      CheckinID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 0,
      reqUserID: 1,
      UserID: 5,
      CheckinID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 4,
      reqUserID: 2,
      UserID: 1,
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 4,
      reqUserID: 3,
      UserID: 4,
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 2,
      reqUserID: 5,
      UserID: 1,
      CheckinID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 2,
      reqUserID: 6,
      UserID: 7,
      CheckinID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
