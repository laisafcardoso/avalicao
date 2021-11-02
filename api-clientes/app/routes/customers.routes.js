module.exports = (app) => {
  const customers = require("../controllers/customers.controller.js");

  var router = require("express").Router();

  //cadastrando cliente
  router.post("/", customers.create);

  // listando todos os clientes
  router.get("/", customers.findAll);

  // atualizando o cliente conforme o id
  router.put("/:id", customers.update);

  // deletando o cliente
  router.delete("/:id", customers.delete);

  //buscando um único cliene
  router.get("/:id", customers.findOne);

  app.use("/api/customers", router);
};
