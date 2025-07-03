'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'location', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'latitude', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Users', 'longitude', {
      type: Sequelize.FLOAT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'location');
    await queryInterface.removeColumn('Users', 'latitude');
    await queryInterface.removeColumn('Users', 'longitude');
  }
};
