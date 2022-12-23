module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Books',
          'deletedAt',
          {
              allowNull: true,
              type: Sequelize.DATE
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Books', 'deletedAt')
  }
};