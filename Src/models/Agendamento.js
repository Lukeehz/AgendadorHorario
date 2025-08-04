const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const User = require("./User");

const Agendamento = sequelize.define("Agendamento", {
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  horario: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pendente", "confirmado", "cancelado"),
    defaultValue: "pendente"
  }
});

Agendamento.belongsTo(User, { as: "cliente", foreignKey: "clienteId" });
Agendamento.belongsTo(User, { as: "barbeiro", foreignKey: "barbeiroId" });

User.hasMany(Agendamento, { foreignKey: "clienteId", as: "agendamentosFeitos" });
User.hasMany(Agendamento, { foreignKey: "barbeiroId", as: "agendamentosRecebidos" });

module.exports = Agendamento;
