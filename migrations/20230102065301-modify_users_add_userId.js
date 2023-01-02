module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'userID',
          {
              allowNull: true,
              type: Sequelize.INTEGER
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'userID')
  }
};