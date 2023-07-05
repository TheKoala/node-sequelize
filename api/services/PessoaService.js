const database = require("../models");
const Service = require("./Services");

class PessoaService extends Service {
  constructor() {
    super("Pessoas");
    this.matriculas = new Service("Matriculas");
  }

  listarAtivos(where = {}) {
    return database[this.modelo].findAll({ where: { ...where } });
  }

  listarTodos(paranoid, where = {}) {
    return database[this.modelo]
      .scope("todos")
      .findAll({ where: { ...where }, paranoid: paranoid });
  }

  async desativaPessoa(id) {
    return database.sequelize.transaction(async (t) => {
      await super.atualiza({ ativo: false }, id, { transaction: t });
      await this.matriculas.atualizaDados(
        { status: "cancelado" },
        {
          estudante_id: id,
        },
        { transaction: t }
      );
    });
  }
}

module.exports = PessoaService;
