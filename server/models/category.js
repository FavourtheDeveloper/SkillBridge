import { DataTypes } from 'sequelize';
import sequelize from '../config/db'; // adjust path as needed

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default Category;
