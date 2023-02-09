"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      dob: DataTypes.DATE,
      image: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        unique: true,
      },
      addressId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  Profile.associate = function (models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "user",
    });
    Profile.hasMany(models.Addresses, {
      foreignKey: "profileId",
      as: "addresses",
    });
  };
  return Profile;
};
