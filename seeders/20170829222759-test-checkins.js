'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkins', [{
      status: "On Schedule",
      lat: "29.742063",
      lng: "-95.386246",
      time: "2017-09-01 14:30 +0000",
      emCell: "2103520990",
      requestStatus: "Pending",
      UserID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "On Schedule",
      lat: "29.900808",
      lng: "-97.955796",
      time: "2017-09-01 15:30 +0000",
      emCell: "8324310106",
      requestStatus: "Pending",
      UserID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
