module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Books',
          'bookId',
          {
              allowNull: false,
              unique:true,
              type: Sequelize.INTEGER
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Books', 'bookId')
  }
};