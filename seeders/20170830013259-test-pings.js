'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pings', [{
      lat: "29.742063",
      lng: "-95.386246",
      time: new Date("2017-09-05T17:30:00Z"),
      CheckinID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.901057",
      lng: "-97.911498",
      time: new Date("2017-09-05T16:00:00Z"),
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.892696",
      lng: "-97.921540",
      time: new Date("2017-09-05T16:05:00Z"),
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.881057",
      lng: "-97.931498",
      time: new Date("2017-09-05T16:10:00Z"),
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.609107",
      lng: "-95.642681",
      time: new Date("2017-09-05T15:30:00Z"),
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.574327",
      lng: "-95.625000",
      time: new Date("2017-09-05T15:35:00Z"),
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.587291",
      lng: "-95.592384",
      time: new Date("2017-09-05T15:40:00Z"),
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.566937",
      lng: "-95.397184",
      time: new Date("2017-09-05T15:00:00Z"),
      CheckinID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.566937",
      lng: "-95.397184",
      time: new Date("2017-09-05T14:30:00Z"),
      CheckinID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
