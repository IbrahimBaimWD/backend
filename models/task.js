"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Task;
};
