"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_Carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      product_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "products",
          key: "id",
          as: "products",
        },
      },
      cart_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "carts",
          key: "id",
          as: "carts",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_Carts");
  },
};
