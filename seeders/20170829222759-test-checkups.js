'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkups', [{
      reqUserID: 1,
      reqUserName: 'Eamon',
      UserID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 1,
      reqUserName: 'Eamon',
      UserID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 1,
      reqUserName: 'Eamon',
      UserID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 2,
      reqUserName: 'Camila',
      UserID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 3,
      reqUserName: 'Nahid',
      UserID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 5,
      reqUserName: 'Omid',
      UserID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      reqUserID: 6,
      reqUserName: 'Kafah',
      UserID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
