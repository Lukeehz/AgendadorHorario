const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./User");

const Barbeiro = sequelize.define("Barbeiro", {
  diasDisponiveis: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horarioInicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horarioFim: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

Barbeiro.belongsTo(User);
User.hasOne(Barbeiro);

module.exports = Barbeiro;
