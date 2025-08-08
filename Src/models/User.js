const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const User = sequelize.define("User", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM("cliente", "barbeiro", "proprietario", "admin"),
    allowNull: false
  },
  resetCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetCodeExpires: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = User;
