'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pings', [{
      lat: "29.742063",
      lng: "-95.386246",
      time: "2017-09-05 17:30",
      CheckinID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.901057",
      lng: "-97.911498",
      time: "2017-09-05 16:00",
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.892696",
      lng: "-97.921540",
      time: "2017-09-05 16:05",
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.901057",
      lng: "-97.911498",
      time: "2017-09-05 16:10",
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.609107",
      lng: "-95.642681",
      time: "2017-09-05 15:30",
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.574327",
      lng: "-95.625000",
      time: "2017-09-05 15:35",
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.587291",
      lng: "-95.592384",
      time: "2017-09-05 15:40",
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.566937",
      lng: "-95.397184",
      time: "2017-09-05 15:00",
      CheckinID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.566937",
      lng: "-95.397184",
      time: "2017-09-05 14:30",
      CheckinID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
