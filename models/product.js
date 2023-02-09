"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      user_id: DataTypes.UUID,
      category_id: DataTypes.INTEGER,
      discount_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.associate = function (models) {
    Product.hasMany(models.Product_Image, {
      foreignKey: "product_id",
      as: "product_image",
    });
    Product.belongsToMany(models.Cart, {
      through: "Product_Cart",
      as: "carts",
      foreignKey: "cart_id",
    });
    Product.hasMany(models.Product_Cart, {
      onDelete: "CASCADE",
      foreignKey: "product_id",
      as: "product_carts",
    });
    Product.belongsTo(models.Product_Discount, {
      foreignKey: "discount_id",
      as: "product_discounts",
    });
    Product.belongsTo(models.Product_Category, {
      foreignKey: "category_id",
      as: "product_categorys",
    });
    Product.hasOne(models.Product_Stock, {
      foreignKey: "product_id",
      as: "product_stocks",
    });
  };
  return Product;
};
