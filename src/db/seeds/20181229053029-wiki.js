'use strict';

 const faker = require("faker");

//#2
 let wikis = [];

 for(let i = 1 ; i <= 15 ; i++){
   wikis.push({
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: faker.random.number(),
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
    return queryInterface.bulkInsert("Wikis", [{
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 2,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 3,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 4,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 5,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 6,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 7,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 8,
     createdAt: new Date(),
     updatedAt: new Date()
      }, {
     title: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     userId: 9,
     createdAt: new Date(),
     updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkInsert("Wikis", null, {});
  }
};
