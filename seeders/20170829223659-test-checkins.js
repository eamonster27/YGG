'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkins', [{
      alerts: 1, //pings, snooze, disable, home, approved, declined, etc.
      status: "Home",
      address: "3403 Audubon Pl",
      lat: "29.742063",
      lng: "-95.386246",
      time: new Date("2017-09-05T17:30:00Z"),
      requestStatus: "Approved",
      emContactID: 2,
      UserID: 1, //Eamon
      CheckupID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 0,
      status: "Scheduled",
      address: "3403 Audubon Pl",
      lat: "29.742063",
      lng: "-95.386246",
      time: new Date("2017-09-06T17:00:00Z"),
      requestStatus: "Pending",
      emContactID: 6,
      UserID: 1, //Eamon
      CheckupID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 0,
      status: "Scheduled",
      address: "3403 Audubon Pl",
      lat: "29.742063",
      lng: "-95.386246",
      time: new Date("2017-09-07T16:30:00Z"),
      requestStatus: "Declined",
      emContactID: 5,
      UserID: 1, //Eamon
      CheckupID: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 4,
      status: "Unresponsive",
      address: "912 Sagewood Trl",
      lat: "29.900808",
      lng: "-97.955796",
      time: new Date("2017-09-05T16:00:00Z"),
      requestStatus: "Approved",
      emContactID: 1,
      UserID: 2, //Camila
      CheckupID: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 4,
      status: "Panic",
      address: "14 Asbury Park Court",
      lat: "29.565607",
      lng: "-95.592912",
      time: new Date("2017-09-05T15:30:00Z"),
      requestStatus: "Approved",
      emContactID: 4,
      UserID: 3, //Mommy
      CheckupID: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 2,
      status: "Disabled",
      address: "2225 Long Cove Court",
      lat: "29.570977",
      lng: "-95.398422",
      time: new Date("2017-09-05T15:00:00Z"),
      requestStatus: "Approved",
      emContactID: 1,
      UserID: 5, //Omid
      CheckupID: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 2,
      status: "Snoozed",
      address: "2225 Long Cove Court",
      lat: "29.570977",
      lng: "-95.398422",
      time: new Date("2017-09-05T14:30:00Z"),
      requestStatus: "Approved",
      emContactID: 7,
      UserID: 6, //Kafah
      CheckupID: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
