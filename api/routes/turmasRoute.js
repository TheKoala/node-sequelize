const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router
  .get("/turmas", TurmaController.listarTurmas)
  .get("/turmas/lotadas", TurmaController.listarTurmasLotadas)
  .get("/turmas/:id", TurmaController.listarTurmaPorId)
  .post("/turmas", TurmaController.cadastraTurma)
  .put("/turmas/:id", TurmaController.atualizaTurma)
  .delete("/turmas/:id", TurmaController.deletaTurma)
  .post("/turmas/:id/restaura", TurmaController.restauraTurma);

module.exports = router;
