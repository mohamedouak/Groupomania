const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define ('post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING
    }
    
  })
}

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // models.post.belongsTo(models.User, {
//       //   foreignKey: {
//       //     allowNull: false
//       //   }, 
//       // }),
//       //   models.post.hasMany(models.comment )
//     }
//   };
//   post.init({
//     message: DataTypes.TEXT,
//     imageUrl: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'post',
//   });
//   return post;
// };


