module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'pwdTimeStamp',
          {
              type: Sequelize.DATE,
              defaultValue:null
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'pwdTimeStamp')
  }
};