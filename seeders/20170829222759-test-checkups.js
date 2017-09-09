'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkups', [{
      reqUserID: 1,
      UserID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 1,
      UserID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 1,
      UserID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 2,
      UserID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 3,
      UserID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 5,
      UserID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 6,
      UserID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
