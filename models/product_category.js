"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Category.init(
    {
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product_Category",
    }
  );
  Product_Category.associate = function (models) {
    Product_Category.hasOne(models.Product, {
      foreignKey: "category_id",
      as: "product_categorys",
    });
  };
  return Product_Category;
};
