const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.post("/gerar-treino", async (req, res) => {
  const {
    idade,
    sexo,
    objetivo,
    diasPorSemana,
    localTreino, // tipo
    altura,
    peso,
    nivel,
    usuario_id,
  } = req.body;

  const dias = ["A", "B", "C", "D", "E", "F", "G"].slice(0, diasPorSemana);

  try {
    if (!usuario_id) {
      return res.status(400).json({ erro: "ID do usuário não enviado" });
    }

    // 1. Cria o plano
    const [resultado] = await db.promise().execute(
      `INSERT INTO planos 
        (usuario_id, nome, objetivo, dias_por_semana, local_treino, idade, sexo, altura, peso, nivel, criado_em)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        usuario_id,
        `Plano ${objetivo}`,
        objetivo,
        diasPorSemana,
        localTreino,
        idade,
        sexo,
        altura,
        peso,
        nivel,
      ]
    );

    const plano_id = resultado.insertId;
    const limiteTotal = diasPorSemana * 6;

    let exerciciosSelecionados = [];

    const adicionarExercicios = async (query, params) => {
      const [exercicios] = await db.promise().query(query, params);
      exerciciosSelecionados = exerciciosSelecionados.concat(exercicios);
    };

    // 2. Compatíveis com objetivo + nível + tipo
    await adicionarExercicios(
      `SELECT * FROM exercicios 
       WHERE objetivo = ? AND nivel = ? AND tipo = ? 
       ORDER BY RAND() 
       LIMIT ?`,
      [objetivo, nivel, localTreino, limiteTotal]
    );

    // 3. Por objetivo + nível
    if (exerciciosSelecionados.length < limiteTotal) {
      const restante = limiteTotal - exerciciosSelecionados.length;
      const ids = exerciciosSelecionados.map(() => "?").join(",");
      const params = [objetivo, nivel, ...exerciciosSelecionados.map(e => e.id), restante];
      await adicionarExercicios(
        `SELECT * FROM exercicios 
         WHERE objetivo = ? AND nivel = ? 
         AND id NOT IN (${ids}) 
         ORDER BY RAND() 
         LIMIT ?`,
        params
      );
    }

    // 4. Apenas por objetivo
    if (exerciciosSelecionados.length < limiteTotal) {
      const restante = limiteTotal - exerciciosSelecionados.length;
      const ids = exerciciosSelecionados.map(() => "?").join(",");
      const params = [objetivo, ...exerciciosSelecionados.map(e => e.id), restante];
      await adicionarExercicios(
        `SELECT * FROM exercicios 
         WHERE objetivo = ? 
         AND id NOT IN (${ids}) 
         ORDER BY RAND() 
         LIMIT ?`,
        params
      );
    }

    // 5. Aleatórios
    if (exerciciosSelecionados.length < limiteTotal) {
      const restante = limiteTotal - exerciciosSelecionados.length;
      const ids = exerciciosSelecionados.map(() => "?").join(",");
      const params = [...exerciciosSelecionados.map(e => e.id), restante];
      await adicionarExercicios(
        `SELECT * FROM exercicios 
         WHERE id NOT IN (${ids}) 
         ORDER BY RAND() 
         LIMIT ?`,
        params
      );
    }

    // 6. Distribui entre os dias
    const porDia = {};
    dias.forEach((d) => (porDia[d] = []));

    exerciciosSelecionados.forEach((ex, i) => {
      const dia = dias[i % dias.length];
      porDia[dia].push(ex);
    });

    // 7. Salva no plano
    for (const dia of dias) {
      for (const ex of porDia[dia]) {
        await db.promise().execute(
          `INSERT INTO exercicios_do_plano 
            (plano_id, nome, nome_exercicio, series, repeticoes, carga, dia, imagem)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            plano_id,
            ex.nome,
            ex.nome,
            ex.series || "3",
            ex.repeticoes || "10",
            ex.carga || "Média",
            dia,
            ex.imagem_url || "generic-exercise.png",
          ]
        );
      }
    }

    // Atualiza o usuário
    await db.promise().execute(
      `UPDATE usuarios SET idade = ?, altura = ?, peso = ?, sexo = ?, objetivo = ?, nivel = ?, local_treino = ?
      WHERE id = ?`,
      [idade, altura, peso, sexo, objetivo, nivel, localTreino, usuario_id]
    );

    res.json({ mensagem: "Plano salvo com sucesso!" });
  } catch (erro) {
    console.error("Erro ao salvar plano:", erro);
    res.status(500).json({ erro: "Erro ao salvar plano" });
  }
});

// GET /api/buscar-exercicios?termo=...
router.get("/buscar-exercicios", async (req, res) => {
  const termo = req.query.termo;

  if (!termo || termo.length < 2) {
    return res.status(400).json({ erro: "Termo de busca muito curto." });
  }

  try {
    const [exercicios] = await db.promise().query(
      `SELECT id, nome, imagem_url FROM exercicios 
       WHERE nome LIKE ? 
       ORDER BY nome ASC 
       LIMIT 10`,
      [`%${termo}%`]
    );

    res.json({ exercicios });
  } catch (err) {
    console.error("Erro ao buscar exercícios:", err);
    res.status(500).json({ erro: "Erro interno ao buscar exercícios." });
  }
});

module.exports = router;
