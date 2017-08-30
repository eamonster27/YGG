'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkups', [{
      cell: "8324310106",
      UserID: 2,
      CheckinID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cell: "2103520990",
      UserID: 1,
      CheckinID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
