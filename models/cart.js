"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init(
    {
      user_id: {
        type: DataTypes.STRING,
        unique: true,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "users",
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      as: "users",
    });
    Cart.belongsToMany(models.Product, {
      through: "Product_Cart",
      onDelete: "CASCADE",
      foreignKey: "product_id",
      as: "products",
    });
    Cart.hasMany(models.Product_Cart, {
      onDelete: "CASCADE",
      foreignKey: "cart_id",
      as: "product_carts",
    });
  };
  return Cart;
};
