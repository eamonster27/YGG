'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Checkins', [{
      status: "Home",
      lat: "29.742063", //3403 Audubon Pl
      lng: "-95.386246",
      time: "Friday, September 5 2017 5:30 PM",
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
      time: "Friday, September 6 2017 5:00 PM",
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
      time: "Friday, September 7 2017 4:30 PM",
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
      time: "Friday, September 5 2017 4:00 PM",
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
      time: "Friday, September 5 2017 3:30 PM",
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
      time: "Friday, September 5 2017 3:00 PM",
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
      time: "Friday, September 5 2017 2:30 PM",
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
