"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Gigs", "category", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "", // You can change this or allow nulls
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Gigs", "category");
  },
};
