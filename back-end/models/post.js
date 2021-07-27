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

