module.exports = (sequelize, DataTypes) => {
    const Gig = sequelize.define("Gig", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Gig.associate = (models) => {
      Gig.belongsTo(models.User, { foreignKey: "userId" });
    };
  
    return Gig;
  };
  