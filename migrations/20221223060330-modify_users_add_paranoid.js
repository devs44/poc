module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'deletedAt',
          {
              allowNull: true,
              type: Sequelize.DATE
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('TABLE_NAME', 'deletedAt')
  }
};