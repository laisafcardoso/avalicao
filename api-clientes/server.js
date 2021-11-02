const express = require("express");
const cors = require("cors");

const app = express();

/*var corsOptions = {
  origin: "http://localhost:3000/",
};

app.use(cors(corsOptions));*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando." });
});

require("./app/routes/customers.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
