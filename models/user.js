"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      verificationSignature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: "userId",
      as: "profile",
    });
    User.hasMany(models.Task, {
      foreignKey: "userId",
      as: "task",
    });
    User.hasOne(models.Branch, {
      foreignKey: "user_id",
      as: "branchs",
    });
    User.hasOne(models.Product, {
      foreignKey: "user_id",
      as: "product",
    });
    User.hasOne(models.Cart, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      as: "carts",
    });
  };
  return User;
};
