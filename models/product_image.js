"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Image.init(
    {
      product_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product_Image",
    }
  );
  Product_Image.associate = function (models) {
    Product_Image.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product_image",
    });
  };
  return Product_Image;
};
