// models/booking.js
module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      date: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
    });
  
    Booking.associate = (models) => {
      Booking.belongsTo(models.User, { foreignKey: "userId" }); // customer
      Booking.belongsTo(models.Gig, { foreignKey: "gigId" });   // booked gig
    };
  
    return Booking;
  };
  