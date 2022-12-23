'use strict';
/** @type {import('sequelize-cli').Migration} */



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookName: {
        type: Sequelize.STRING,
        unique:true
      },
      genre: {
        type: Sequelize.STRING
      },
      authorName: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      publishDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};