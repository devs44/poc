module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'authors',
          'authorId',
          {
              allowNull: false,
              type: Sequelize.INTEGER
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('authors', 'authorId')
  }
};