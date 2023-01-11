module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'userID',
          {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            // allowNull: false,
            // primaryKey: true
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'userID')
  }
};