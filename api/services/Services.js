const database = require("../models");

class Services {
  constructor(modelo) {
    this.modelo = modelo;
  }

  listarTudo(arg) {
    return database[this.modelo].findAll(arg);
  }

  atualiza(dados, id, transaction = {}) {
    return database[this.modelo].update(
      dados,
      {
        where: { id: id },
      },
      transaction
    );
  }

  atualizaDados(dados, where, transaction = {}) {
    return database[this.modelo].update(
      dados,
      {
        where: { ...where },
      },
      transaction
    );
  }
}

module.exports = Services;
