module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sexo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf_cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Customers;
};
