'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K. Rowling',
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '1984',
        author: 'George Orwell',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        stock: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
