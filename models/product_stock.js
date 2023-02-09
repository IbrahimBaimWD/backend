"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Stock.init(
    {
      stock: DataTypes.INTEGER,
      product_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Product_Stock",
    }
  );
  Product_Stock.associate = function (models) {
    Product_Stock.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product_stocks",
    });
  };
  return Product_Stock;
};
