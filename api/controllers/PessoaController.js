const database = require("../models");

class PessoaController {
  static listarPessoas(req, res) {
    database.Pessoas
      .findAll()
      .then((pessoas) => {
        res.status(200).send(pessoas);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

module.exports = PessoaController;
