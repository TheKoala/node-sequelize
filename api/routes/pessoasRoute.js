const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.listarPessoasAtivas)
  .get("/pessoas/todos", PessoaController.listarPessoas)
  .get("/pessoas/:id", PessoaController.listarPessoaPorId)
  .post("/pessoas", PessoaController.cadastraPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .delete("/pessoas/:id", PessoaController.deletaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .post("/pessoas/:id/desativa", PessoaController.desativaPessoa)
  .get("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.listaMatriculaPorId)
  .get("/pessoas/:idEstudante/matricula/", PessoaController.listaMatriculasPorEstudante)
  .get("/pessoas/matricula/:idTurma/confirmadas", PessoaController.contaMatriculasPorTurma)
  .post("/pessoas/:idEstudante/matricula/", PessoaController.novaMatricula)
  .put("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.atualizaMatricula)
  .delete("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.deletaMatricula)
  .post("/pessoas/:idEstudante/matricula/:idMatricula/restaura", PessoaController.restauraMatricula);

module.exports = router;
