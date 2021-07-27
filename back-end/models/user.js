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


