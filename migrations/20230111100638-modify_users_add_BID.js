const { DataTypes } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Books',
          'BID',
          {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Books', 'BID')
  }
};