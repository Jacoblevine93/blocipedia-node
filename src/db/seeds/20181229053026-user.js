'use strict';

 const faker = require("faker");

//#2
 let users = [];

 for(let i = 1 ; i <= 15 ; i++){
   users.push({
     name: faker.name.findName(),
     email: faker.internet.email(),
     password: faker.hacker.noun(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkInsert("Users", null, {});
  }
};
