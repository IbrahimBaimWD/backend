"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Discount.init(
    {
      name: DataTypes.STRING,
      persentage: DataTypes.INTEGER,
      nominal: DataTypes.INTEGER,
      discount_price: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      start_discount: DataTypes.DATE,
      end_discount: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product_Discount",
    }
  );
  Product_Discount.associate = function (models) {
    Product_Discount.hasOne(models.Product, {
      foreignKey: "discount_id",
      as: "product_discounts",
    });
  };
  return Product_Discount;
};
