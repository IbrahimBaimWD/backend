"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Cart.init(
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      status: { type: DataTypes.BOOLEAN, defaultValue: false },
      product_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Cart",
    }
  );
  Product_Cart.associate = function (models) {
    Product_Cart.belongsTo(models.Product, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
      as: "products",
    });
    Product_Cart.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      onDelete: "CASCADE",
      as: "carts",
    });
  };
  return Product_Cart;
};
