const database = require("../models");

class PessoaController {
  static listarPessoas(req, res) {
    database.Pessoas.findAll()
      .then((pessoas) => {
        res.status(200).send(pessoas);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static listarPessoaPorId(req, res) {
    const { id } = req.params;
    database.Pessoas.findOne({
      where: { id: Number(id) },
    })
      .then((pessoa) => {
        res.status(200).send(pessoa);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static cadastraPessoa(req, res) {
    const novaPessoa = req.body;

    database.Pessoas.create(novaPessoa)
      .then((pessoa) => {
        res.status(200).send(pessoa);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const pessoaAtual = req.body;

    try {
      await database.Pessoas.update(pessoaAtual, {
        where: { id: Number(id) },
      });

      database.Pessoas.findOne({
        where: { id: Number(id) },
      }).then((pessoa) => {
        res.status(200).send(pessoa);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static deletaPessoa(req, res) {
    const { id } = req.params;
    database.Pessoas.destroy({
      where: { id: Number(id) },
    })
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static listaMatriculaPorId(req, res) {
    const { idEstudante, idMatricula } = req.params;
    database.Matriculas.findOne({
      where: { id: Number(idMatricula), estudante_id: Number(idEstudante) },
    })
      .then((matricula) => {
        res.status(200).send(matricula);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static novaMatricula(req, res) {
    const { idEstudante } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(idEstudante) };

    database.Matriculas.create(novaMatricula)
      .then((matricula) => {
        res.status(200).send(matricula);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static async atualizaMatricula(req, res) {
    const { idEstudante, idMatricula } = req.params;
    const matriculaAtualizada = req.body;

    try {
      await database.Matriculas.update(matriculaAtualizada, {
        where: { id: Number(idMatricula), estudante_id: Number(idEstudante) },
      });

      database.Matriculas.findOne({
        where: { id: Number(idMatricula), estudante_id: Number(idEstudante) },
      }).then((matricula) => {
        res.status(200).send(matricula);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static deletaMatricula(req, res) {
    const { idEstudante, idMatricula } = req.params;
    database.Matriculas.destroy({
      where: { id: Number(idMatricula), estudante_id: Number(idEstudante) },
    })
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

module.exports = PessoaController;
