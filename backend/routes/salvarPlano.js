const express = require("express");
const router = express.Router();
const db = require("../models/db"); // ou o caminho correto da conexão

router.post("/salvar-plano", async (req, res) => {
  const { usuario_id, nome, objetivo, diasPorSemana, localTreino, idade, sexo, exercicios } = req.body;

  try {
    // 1. Inserir plano
    const [planoResult] = await db.execute(
      `INSERT INTO planos (usuario_id, nome, objetivo, dias_por_semana, local_treino, idade, sexo, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [usuario_id, nome, objetivo, diasPorSemana, localTreino, idade, sexo]
    );

    const plano_id = planoResult.insertId;

    // 2. Inserir exercícios do plano
    for (const dia of exercicios) {
      for (const ex of dia) {
        await db.execute(
          `INSERT INTO exercicios_do_plano (plano_id, nome, series, repeticoes, carga)
           VALUES (?, ?, ?, ?, ?)`,
          [plano_id, ex.nome, ex.series, ex.repeticoes, ex.carga]
        );
      }
    }

    res.json({ mensagem: "Plano salvo com sucesso!", plano_id });
  } catch (erro) {
    console.error("Erro ao salvar plano:", erro);
    res.status(500).json({ erro: "Erro ao salvar plano no banco de dados" });
  }
});

module.exports = router;
