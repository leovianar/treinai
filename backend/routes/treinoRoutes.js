const express = require('express');
const router = express.Router();
const treinoController = require('../controllers/treinoController');
const db = require("../models/db");


// Rota para listar exercícios
router.get('/exercicios', treinoController.listarExercicios);

// ⚠️ Removido o cadastro de usuário e login (agora está em usuarioRoutes.js)

// Salvar um treino
router.post('/treinos', treinoController.salvarTreino);

// Listar treinos por usuário
router.get('/treinos/:usuario_id', treinoController.listarTreinosPorUsuario);

// Detalhes de um treino específico
router.get('/treinos/:id/detalhes', treinoController.detalhesTreino);

// ROTA: Buscar exercícios por grupo muscular selecionado
router.get("/exercicios-do-grupo", async (req, res) => {
    const grupos = req.query.grupos?.split(",") || [];
  
    if (grupos.length === 0) {
      return res.status(400).json({ erro: "Nenhum grupo informado." });
    }
  
    try {
      const [resultados] = await db.promise().query(
        `SELECT * FROM exercicios WHERE grupo_muscular IN (${grupos.map(() => "?").join(",")}) ORDER BY nome ASC`,
        grupos
      );
  
      res.json(resultados);
    } catch (err) {
      console.error("Erro ao buscar exercícios:", err);
      res.status(500).json({ erro: "Erro no servidor" });
    }
  });
  

module.exports = router;
