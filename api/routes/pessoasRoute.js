const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.listarPessoas)
  .get("/pessoas/:id", PessoaController.listarPessoaPorId)
  .get("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.listaMatriculaPorId)
  .post("/pessoas", PessoaController.cadastraPessoa)
  .post("/pessoas/:idEstudante/matricula/", PessoaController.novaMatricula)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .put("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.atualizaMatricula)
  .delete("/pessoas/:id", PessoaController.deletaPessoa)
  .delete("/pessoas/:idEstudante/matricula/:idMatricula", PessoaController.deletaMatricula);

module.exports = router;
