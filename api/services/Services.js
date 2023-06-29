const database = require("../models");

class Services {
  constructor(modelo) {
    this.modelo = modelo;
  }

  listarTudo(arg) {
    return database[this.modelo].findAll(arg);
  }
}

module.exports = Services;
