import { sequelize } from 'Server/db';
import Sequelize from 'sequelize';

const CategoryModel = sequelize.define('plattersCategory', {
  categoryId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: Sequelize.STRING,
  categoryImage: Sequelize.STRING,
  categoryStatus: Sequelize.INTEGER
});

CategoryModel.sync();

export default CategoryModel;
