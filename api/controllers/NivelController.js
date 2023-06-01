const database = require("../models");

class NivelController {
  static listarNiveis(req, res) {
    database.Niveis.findAll()
      .then((niveis) => {
        res.status(200).send(niveis);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static listarNivelPorId(req, res) {
    const { id } = req.params;
    database.Niveis.findOne({
      where: { id: Number(id) },
    })
      .then((nivel) => {
        res.status(200).send(nivel);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static cadastraNivel(req, res) {
    const novoNivel = req.body;

    database.Niveis.create(novoNivel)
      .then((nivel) => {
        res.status(200).send(nivel);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const nivelAtual = req.body;

    try {
      await database.Niveis.update(nivelAtual, {
        where: { id: Number(id) },
      });

      database.Niveis.findOne({
        where: { id: Number(id) },
      }).then((nivel) => {
        res.status(200).send(nivel);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static deletaNivel(req, res) {
    const { id } = req.params;
    database.Niveis.destroy({
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

module.exports = NivelController;
