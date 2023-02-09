"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      subDistrict: {
        type: Sequelize.STRING,
      },
      urbanVillage: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.INTEGER,
      },
      profileId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Profiles",
          key: "id",
          as: "profileId",
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
    await queryInterface.dropTable("Addresses");
  },
};