const express = require("express");
const router = express.Router();

// Rota GET /api/progresso/:usuario_id
router.get("/progresso/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  // Simulando dados de progresso (iremos substituir futuramente por dados reais do banco)
  const progresso = {
    frequencia_semanal: {
      Seg: 3,
      Ter: 2,
      Qua: 4,
      Qui: 3,
      Sex: 1,
      Sab: 0,
      Dom: 2,
    },
    evolucao_mensal: [
      { data: "2025-04-01", feitos: 2 },
      { data: "2025-04-02", feitos: 3 },
      { data: "2025-04-03", feitos: 1 },
      { data: "2025-04-04", feitos: 0 },
      { data: "2025-04-05", feitos: 4 },
      { data: "2025-04-06", feitos: 2 },
      { data: "2025-04-07", feitos: 3 },
      { data: "2025-04-08", feitos: 1 },
      { data: "2025-04-09", feitos: 0 },
    ],
    distribuicao_grupo_muscular: {
      Peito: 5,
      Costas: 4,
      Pernas: 2,
      Ombros: 3,
      Braços: 4,
      Cardio: 1,
    },
    nivel: "Intermediário",
    total_treinos: 45,
    total_mes: 18,
    ultima_atualizacao_plano: "2025-03-06",
    conquistas: [
      { nome: "7 dias seguidos", desbloqueado: true },
      { nome: "20 treinos no mês", desbloqueado: false },
      { nome: "100 treinos no total", desbloqueado: false },
    ],
  };

  res.json(progresso);
});

module.exports = router;
