'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Pings', [{
      lat: "29.742063",
      lng: "-95.386246",
      time: "Friday, September 5 2017 5:30 PM",
      CheckinID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.901057",
      lng: "-97.911498",
      time: "Friday, September 5 2017 4:00 PM",
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.892696",
      lng: "-97.921540",
      time: "Friday, September 5 2017 4:05 PM",
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.901057",
      lng: "-97.911498",
      time: "Friday, September 5 2017 4:10 PM",
      CheckinID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.609107",
      lng: "-95.642681",
      time: "Friday, September 5 2017 3:30 PM",
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.574327",
      lng: "-95.625000",
      time: "Friday, September 5 2017 3:35 PM",
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.587291",
      lng: "-95.592384",
      time: "Friday, September 5 2017 3:40 PM",
      CheckinID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.566937",
      lng: "-95.397184",
      time: "Friday, September 5 2017 3:00 PM",
      CheckinID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      lat: "29.566937",
      lng: "-95.397184",
      time: "Friday, September 5 2017 2:30 PM",
      CheckinID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
