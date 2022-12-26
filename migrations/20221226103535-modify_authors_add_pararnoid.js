module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'authors',
          'deletedAt',
          {
              allowNull: true,
              type: Sequelize.INTEGER
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('authors', 'deletedAt')
  }
};