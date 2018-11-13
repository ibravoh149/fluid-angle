'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetPasswordToken:DataTypes.STRING,
    resetPasswordExpires:DataTypes.DATE
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.contact, {foreignKey:'userId', onDelete:'CASCADE'});
  };
  return user;
};