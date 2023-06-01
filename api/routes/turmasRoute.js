const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router
  .get("/Turmas", TurmaController.listarTurmas)
  .get("/Turmas/:id", TurmaController.listarTurmaPorId)
  .post("/Turmas", TurmaController.cadastraTurma)
  .put("/Turmas/:id", TurmaController.atualizaTurma)
  .delete("/Turmas/:id", TurmaController.deletaTurma)
  .post("/Turmas/:id/restaura", TurmaController.restauraTurma);

module.exports = router;
