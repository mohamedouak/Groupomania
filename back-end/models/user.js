const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define ('user', {
    email: 
    {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
    },
    username:
    {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },  
    password: {
      type: DataTypes.STRING,
      allowNull:false 
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       // models.User.hasMany(models.Comment);
//       // models.User.hasMany(models.Post);    
//     }
//   };
//   User.init({
//     email: DataTypes.STRING,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
    // isAdmin: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };


// 'use strict';

// const sequelize = require('../sequelize');


// const { Model, DataTypes } = require('sequelize');


// // TODO > Controle Associations
// class User extends Model { // user c'est le model
//   static associate(models) { // fonction static
//     // define association here
//   models.User.hasMany(models.Post, models.Comment);
//   }
// };
// User.init({
//   email: {
//     type: DataTypes.STRING,
//     allowNull:false,
//     unique:true
//   },
//   username:
//   {
//     type: DataTypes.STRING,
//     allowNull:false,
//     unique:true
//   },  
//   password: {
//     type: DataTypes.STRING,
//     allowNull:false 
//   },
    
// }, {
//   sequelize, // on renvoi à la BDD
//   modelName: 'User',
// });

// module.exports = User


