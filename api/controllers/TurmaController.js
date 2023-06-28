const database = require("../models");
const { Op, literal } = require("sequelize");

class TurmaController {
  static listarTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;
    //where: {
    //  data_inicio: { [Op.gte]: data_inicial, [Op.lte]: data_final },
    //}
    database.Turmas.findAll({ where })
      .then((turmas) => {
        res.status(200).send(turmas);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static listarTurmaPorId(req, res) {
    const { id } = req.params;
    database.Turmas.findOne({
      where: { id: Number(id) },
    })
      .then((turma) => {
        res.status(200).send(turma);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static cadastraTurma(req, res) {
    const novaTurma = req.body;

    database.Turmas.create(novaTurma)
      .then((turma) => {
        res.status(200).send(turma);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params;
    const turmaAtual = req.body;

    try {
      await database.Turmas.update(turmaAtual, {
        where: { id: Number(id) },
      });

      database.Turmas.findOne({
        where: { id: Number(id) },
      }).then((turma) => {
        res.status(200).send(turma);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static deletaTurma(req, res) {
    const { id } = req.params;
    database.Turmas.destroy({
      where: { id: Number(id) },
    })
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static restauraTurma(req, res) {
    const { id } = req.params;
    database.Turmas.restore({
      where: { id: Number(id) },
    })
      .then(() => {
        res
          .status(200)
          .send(`Turma com  o ID ${id} foi restaurado com sucesso`);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static async listarTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: { status: "confirmado" },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: literal(`count(turma_id) >= ${lotacaoTurma}`),
      });
      return res.status(200).json(turmasLotadas);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

module.exports = TurmaController;
