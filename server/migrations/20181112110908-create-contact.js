'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      isStarred: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete:"CASCADE",
         references:{
           model:"users",
           key:"id",
           as:"userId"
         }
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contacts');
  }
};