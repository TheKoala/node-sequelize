const database = require("../models");
const { PessoaService } = require("../services");

const pessoaService = new PessoaService();

class PessoaController {

  static listarPessoas(req, res) {
    const { incluiDeletados } = req.query;
    database.Pessoas.scope("todos")
      .findAll({ paranoid: Boolean(!incluiDeletados) })
      .then((pessoas) => {
        res.status(200).send(pessoas);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static listarPessoasAtivas(req, res) {
    const { incluiDeletados } = req.query;
    pessoaService.listarTudo({ paranoid: Boolean(!incluiDeletados) })
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
    const { force } = req.query;
    database.Pessoas.destroy({
      where: { id: Number(id) },
      force: Boolean(force),
    })
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static restauraPessoa(req, res) {
    const { id } = req.params;

    database.Pessoas.restore({
      where: { id: Number(id) },
    })
      .then(
        res
          .status(200)
          .send(`Pessoa com  o ID ${id} foi restaurado com sucesso`)
      )
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  static async desativaPessoa(req, res) {
    const { id } = req.params;

    try {
      await database.sequelize.transaction(async (t) => {
        await database.Pessoas.update(
          { ativo: false },
          {
            where: { id: Number(id) },
          },
          { transaction: t }
        );
        await database.Matriculas.update(
          { status: "cancelado" },
          {
            where: { estudante_id: Number(id) },
          },
          { transaction: t }
        );
        return res
          .status(200)
          .send(`Pessoa com o ID ${id} foi desativada com sucesso`);
      });
    } catch (error) {
      return res.status(500).send(error);
    }
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

  static async listaMatriculasPorEstudante(req, res) {
    const { idEstudante } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: { id: Number(idEstudante) },
      });
      const matriculas = await pessoa.getMatriculas();
      return res.status(200).send(matriculas);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async contaMatriculasPorTurma(req, res) {
    const { idTurma } = req.params;
    try {
      const matriculas = await database.Matriculas.findAndCountAll({
        where: { turma_id: Number(idTurma), status: "confirmado" },
        limit: 20,
        order: [["estudante_id", "DESC"]],
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).send(error);
    }
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

  static restauraMatricula(req, res) {
    const { idEstudante, idMatricula } = req.params;

    database.Matriculas.restore({
      where: { id: Number(idMatricula), estudante_id: Number(idEstudante) },
    })
      .then(
        res
          .status(200)
          .send(`Matricula com  o ID ${idMatricula} foi restaurado com sucesso`)
      )
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

module.exports = PessoaController;
