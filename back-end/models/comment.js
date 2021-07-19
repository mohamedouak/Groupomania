const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define ('comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    content: DataTypes.TEXT
  })
}