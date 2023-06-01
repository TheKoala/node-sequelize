const database = require("../models");

class TurmaController {
  static listarTurmas(req, res) {
    database.Turmas.findAll()
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
}

module.exports = TurmaController;
