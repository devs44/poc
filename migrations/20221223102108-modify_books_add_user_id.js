module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Books',
          'user_id',
          {
              allowNull: true,
              type: Sequelize.INTEGER
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Books', 'user_id')
  }
};