module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'password',
          {
              allowNull: false,
              unique:true,
              type: Sequelize.STRING
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'password')
  }
};