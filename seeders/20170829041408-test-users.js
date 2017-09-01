'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstname: "Eamon",
      lastname: "Bachari",
      email: "eamonbachari@gmail.com",
      cell: "8324310106",
      passcode: "1234",
      paniccode: "4321",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: "Camila",
      lastname: "Rivera",
      email: "cpr32@txstate.edu",
      cell: "2103520990",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: "Nahid",
      lastname: "Bachari",
      email: "njb1999@gmail.com",
      cell: "2819489350",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: "Masoud",
      lastname: "Bachari",
      email: "bacharima@gmail.com",
      cell: "8322123344",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: "Omid",
      lastname: "Bachari",
      email: "obachari@gmail.com",
      cell: "8323417937",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: "Kafah",
      lastname: "Haggerty",
      email: "kafah.bachari@gmail.com",
      cell: "7132313874",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: "Dan",
      lastname: "Haggerty",
      email: "danielhaggerty1976@gmail.com",
      cell: "8322795505",
      passcode: "5678",
      paniccode: "8765",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
