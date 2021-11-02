const db = require("../models");
const Customers = db.customers;
const Op = db.Sequelize.Op;

//listar todos
exports.findAll = (req, res) => {
  Customers.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao listar os clientes",
      });
    });
};

//cadastrar e salvar
exports.create = (req, res) => {
  const customer = {
    nome: req.body.nome,
    cpf_cnpj: req.body.cpf_cnpj,
    endereco: req.body.endereco,
    data_nascimento: req.body.data_nascimento,
    sexo: req.body.sexo,
  };

  Customers.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Aconteceu um erro ao cadastrar, contate o administrador do sistema",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Customers.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o cliente id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao carregar o cliente id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Customers.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cliente atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o cliente id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao atualizar cliente id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Customers.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cliente deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não foi possível deletar o cliente id=${id}. Cliente não encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Aconteceu um erro ao deletar o cliente id=" + id,
      });
    });
};
