'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pings', [{
      lat: "29.742063",
      lng: "-95.386246",
      time: "2017-09-01 14:30 +0000",
      CheckinID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.901057",
      lng: "-97.911498",
      time: "2017-09-01 15:30 +0000",
      CheckinID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.892696",
      lng: "-97.921540",
      time: "2017-09-01 15:35 +0000",
      CheckinID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.890451",
      lng: "-97.936659",
      time: "2017-09-01 15:40 +0000",
      CheckinID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
