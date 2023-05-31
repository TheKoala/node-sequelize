const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.listarPessoas)
  .get("/pessoas/:id", PessoaController.listarPessoaPorId)
  .post("/pessoas", PessoaController.cadastraPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .delete("/pessoas/:id", PessoaController.deletaPessoa);

module.exports = router;
