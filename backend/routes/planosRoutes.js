const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/planos/:usuario_id", async (req, res) => {
  const usuario_id = req.params.usuario_id;

  try {
    const [planos] = await db
      .promise()
      .execute(
        "SELECT id, nome, objetivo, dias_por_semana, local_treino FROM planos WHERE usuario_id = ? ORDER BY id DESC LIMIT 1",
        [usuario_id]
      );

    if (planos.length === 0) {
      return res.status(404).json({ erro: "Nenhum plano encontrado." });
    }

    const plano = planos[0];

    const [exercicios] = await db
      .promise()
      .execute("SELECT * FROM exercicios_do_plano WHERE plano_id = ?", [
        plano.id,
      ]);

    // Agrupar exercícios por dia
    const agrupadoPorDia = {};
    for (const ex of exercicios) {
      if (!agrupadoPorDia[ex.dia]) {
        agrupadoPorDia[ex.dia] = [];
      }
      agrupadoPorDia[ex.dia].push(ex);
    }

    const planoFormatado = Object.entries(agrupadoPorDia).map(
      ([dia, exercicios]) => ({
        dia,
        exercicios,
      })
    );

    res.json({ plano: planoFormatado });
  } catch (err) {
    console.error("Erro ao buscar plano:", err);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

router.get("/exercicios/:plano_id/:dia", async (req, res) => {
  const { plano_id, dia } = req.params;

  try {
    const [exercicios] = await db
      .promise()
      .execute(
        "SELECT id, nome, series, repeticoes, carga FROM exercicios_do_plano WHERE plano_id = ? AND dia = ?",
        [plano_id, dia]
      );

    res.json({ exercicios });
  } catch (err) {
    console.error("Erro ao buscar exercícios por dia:", err);
    res.status(500).json({ erro: "Erro interno ao buscar exercícios" });
  }
});

router.get("/exercicio/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [resultado] = await db.promise().query(
      `SELECT edp.id, edp.series, edp.repeticoes, edp.carga, 
              e.nome, e.descricao, e.dicas, e.imagem_url, e.video_url
       FROM exercicios_do_plano edp
       JOIN exercicios e ON e.nome = edp.nome
       WHERE edp.id = ?`,
      [id]
    );

    if (resultado.length === 0) {
      return res.status(404).json({ erro: "Exercício não encontrado." });
    }

    res.json({ exercicio: resultado[0] });
  } catch (err) {
    console.error("Erro ao buscar exercício:", err);
    res.status(500).json({ erro: "Erro interno ao buscar exercício." });
  }
});



router.get("/treino-dia/:usuario_id/:dia", async (req, res) => {
  const { usuario_id, dia } = req.params;

  try {
    const [planos] = await db
      .promise()
      .execute(
        "SELECT id FROM planos WHERE usuario_id = ? ORDER BY id DESC LIMIT 1",
        [usuario_id]
      );

    if (planos.length === 0) {
      return res.status(404).json({ erro: "Plano não encontrado." });
    }

    const plano_id = planos[0].id;

    const [exercicios] = await db.promise().execute(
      `SELECT ep.*, e.grupo_muscular, e.nome AS nome_exercicio, e.imagem_url AS imagem
       FROM exercicios_do_plano ep
       LEFT JOIN exercicios e ON ep.nome = e.nome
       WHERE ep.plano_id = ? AND ep.dia = ?`,
      [plano_id, dia]
    );

    res.json(exercicios);
  } catch (err) {
    console.error("Erro ao buscar treino por dia:", err);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
});



// GET /api/planos/:usuario_id/dia/:dia
router.get("/planos/:usuario_id/dia/:dia", async (req, res) => {
  const { usuario_id, dia } = req.params;

  try {
    const [planos] = await db
      .promise()
      .execute("SELECT id FROM planos WHERE usuario_id = ? ORDER BY id DESC LIMIT 1", [usuario_id]);

    if (planos.length === 0) return res.status(404).json({ erro: "Plano não encontrado." });

    const plano_id = planos[0].id;

    const [exercicios] = await db
      .promise()
      .execute("SELECT * FROM exercicios_do_plano WHERE plano_id = ? AND dia = ?", [plano_id, dia]);

    res.json({ exercicios });
  } catch (err) {
    console.error("Erro ao buscar treino do dia:", err);
    res.status(500).json({ erro: "Erro interno" });
  }
});


// POST /api/exercicio-do-plano
router.post("/exercicio-do-plano", async (req, res) => {
  const { plano_id, nome, series, repeticoes, carga, dia, imagem } = req.body;

  if (!plano_id || !nome || !dia) {
    return res.status(400).json({ erro: "Dados incompletos para adicionar exercício." });
  }

  try {
    await db.promise().execute(
      `INSERT INTO exercicios_do_plano 
        (plano_id, nome, nome_exercicio, series, repeticoes, carga, dia, imagem)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        plano_id,
        nome,            // nome
        nome,            // nome_exercicio
        series || "3",
        repeticoes || "10",
        carga || "Média",
        dia,
        imagem || "generic-exercise.png",
      ]
    );

    res.json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao adicionar exercício:", err);
    res.status(500).json({ erro: "Erro ao adicionar exercício." });
  }
});





module.exports = router;
