"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "discount_id", {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "product_discounts",
        key: "id",
        as: "product_discounts",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "discount_id", {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "product_discounts",
        key: "id",
        as: "product_discounts",
      },
    });
  },
};
