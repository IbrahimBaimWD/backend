"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addresses.init(
    {
      address: DataTypes.STRING,
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      subDistrict: DataTypes.STRING,
      urbanVillage: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Addresses",
    }
  );
  Addresses.associate = function (models) {
    // associations can be defined here
    Addresses.belongsTo(models.Profile, {
      foreignKey: "profileId",
      onDelete: "CASCADE",
      as: "addresses",
    });
  };
  return Addresses;
};
