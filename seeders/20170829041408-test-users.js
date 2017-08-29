'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      cell: "8324310106",
      passcode: "1234",
      paniccode: "4321",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cell: "2103520990",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
