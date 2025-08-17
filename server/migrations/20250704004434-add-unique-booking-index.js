// migration file
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex("Bookings", ["gigId", "email", "date"], {
      unique: true,
      name: "unique_booking_per_user_per_date"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex("Bookings", "unique_booking_per_user_per_date");
  },
};
