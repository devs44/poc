module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'userId',
          {
              allowNull: true,
              unique:true,
              type: Sequelize.INTEGER
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'userId')
  }
};