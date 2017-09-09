'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkins', [{
      alerts: 1, //pings, snooze, disable, home, approved, declined, etc.
      status: "Home",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "2017-09-05 17:30", //moment(2017-02-08 09:30).format('LLLL')
      requestStatus: "Approved",
      emContactID: 2,
      UserID: 1, //Eamon
      CheckupID: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 0,
      status: "On Schedule",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "2017-09-06 17:00",
      requestStatus: "Pending",
      emContactID: 6,
      UserID: 1, //Eamon
      CheckupID: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      alerts: 0,
      status: "On Schedule",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "2017-09-07 16:30",
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
      lat: "29.900808", //912 Sagewood Trl
      lng: "-97.955796",
      time: "2017-09-05 16:00",
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
      lat: "29.565607", //14 Asbury Park Court
      lng: "-95.592912",
      time: "2017-09-05 15:30",
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
      lat: "29.570977", //2225 Long Cove Court
      lng: "-95.398422",
      time: "2017-09-05 15:00",
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
      lat: "29.570977", //2225 Long Cove Court
      lng: "-95.398422",
      time: "2017-09-05 14:30",
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
