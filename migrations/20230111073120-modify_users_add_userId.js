const { DataTypes } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'Users',
          'UID',
          {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Users', 'UID')
  }
};