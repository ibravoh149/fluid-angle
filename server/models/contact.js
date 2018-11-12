'use strict';
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    contactName: DataTypes.STRING,
    phone: DataTypes.STRING,
    isStarred: DataTypes.BOOLEAN,
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:"CASCADE",
       references:{
         model:"user",
         key:"id",
         as:"userId"
       }
     },
  }, {});
  contact.associate = function(models) {
    // associations can be defined here
    contact.belongsTo(models.user,{foreignKey:'userId'})
  };
  return contact;
};