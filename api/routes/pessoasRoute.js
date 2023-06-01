const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.listarPessoas)
  .get("/pessoas/:id", PessoaController.listarPessoaPorId)
  .post("/pessoas", PessoaController.cadastraPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .delete("/pessoas/:id", PessoaController.deletaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .get("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.listaMatriculaPorId)
  .post("/pessoas/:idEstudante/matricula/", PessoaController.novaMatricula)
  .put("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.atualizaMatricula)
  .delete("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.deletaMatricula)
  .post("/pessoas/:idEstudante/matricula/:idMatricula/restaura", PessoaController.restauraMatricula);

module.exports = router;
