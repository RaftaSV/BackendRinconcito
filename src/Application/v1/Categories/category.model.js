import { DatabaseConnection } from 'Server/db';
import sequelize from 'sequelize';

const CategoryModel = DatabaseConnection.define('plattersCategory', {
  categoryId: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: sequelize.STRING,
  categoryImage: sequelize.STRING,
  categoryStatus: sequelize.INTEGER
});

CategoryModel.sync();

export default CategoryModel;
