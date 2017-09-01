'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkins', [{
      status: "Home",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "2017-09-05 17:30", //moment(2017-02-08 09:30).format('LLLL')
      requestStatus: "Approved",
      emContactID: 2,
      UserID: 1, //Eamon
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "On Schedule",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "2017-09-06 17:00",
      requestStatus: "Pending",
      emContactID: 6,
      UserID: 1, //Eamon
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "On Schedule",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "2017-09-07 16:30",
      requestStatus: "Declined",
      emContactID: 5,
      UserID: 1, //Eamon
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "Unresponsive",
      lat: "29.900808", //912 Sagewood Trl
      lng: "-97.955796",
      time: "2017-09-05 16:00",
      requestStatus: "Approved",
      emContactID: 1,
      UserID: 2, //Camila
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "Panic",
      lat: "29.565607", //14 Asbury Park Court
      lng: "-95.592912",
      time: "2017-09-05 15:30",
      requestStatus: "Approved",
      emContactID: 4,
      UserID: 3, //Mommy
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "Disabled",
      lat: "29.570977", //2225 Long Cove Court
      lng: "-95.398422",
      time: "2017-09-05 15:00",
      requestStatus: "Approved",
      emContactID: 1,
      UserID: 5, //Omid
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: "Snoozed",
      lat: "29.570977", //2225 Long Cove Court
      lng: "-95.398422",
      time: "2017-09-05 14:30",
      requestStatus: "Approved",
      emContactID: 7,
      UserID: 6, //Kafah
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
