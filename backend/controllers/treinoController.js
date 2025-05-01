const db = require('../models/db');
const bcrypt = require('bcryptjs');


// Listar todos os exercícios
const listarExercicios = (req, res) => {
  const sql = 'SELECT * FROM exercicios';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar exercícios:', err);
      return res.status(500).json({ erro: 'Erro no servidor' });
    }

    res.status(200).json(results);
  });
};

// Login do usuário com senha criptografada
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const [results] = await db.promise().execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Usuário não encontrado.' });
    }

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    delete usuario.senha; // Remove senha antes de enviar
    res.status(200).json({ usuario });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

// Salvar um novo treino
const salvarTreino = (req, res) => {
  const { usuario_id, nome, exercicios } = req.body;

  if (!usuario_id || !nome || !Array.isArray(exercicios) || exercicios.length === 0) {
    return res.status(400).json({ erro: 'Dados incompletos para salvar treino.' });
  }

  const sqlTreino = 'INSERT INTO treinos (usuario_id, nome, data) VALUES (?, ?, CURDATE())';

  db.query(sqlTreino, [usuario_id, nome], (err, result) => {
    if (err) {
      console.error('Erro ao salvar treino:', err);
      return res.status(500).json({ erro: 'Erro ao salvar treino.' });
    }

    const treino_id = result.insertId;

    const sqlExercicio = `
      INSERT INTO treino_exercicios
      (treino_id, exercicio_id, series, repeticoes, carga, observacoes)
      VALUES ?
    `;

    const valores = exercicios.map((ex) => [
      treino_id,
      ex.exercicio_id,
      ex.series,
      ex.repeticoes,
      ex.carga,
      ex.observacoes
    ]);

    db.query(sqlExercicio, [valores], (err2) => {
      if (err2) {
        console.error('Erro ao salvar exercícios:', err2);
        return res.status(500).json({ erro: 'Erro ao salvar os exercícios do treino.' });
      }

      res.status(201).json({ mensagem: 'Treino salvo com sucesso!', treino_id });
    });
  });
};

// Listar treinos por usuário
const listarTreinosPorUsuario = (req, res) => {
  const { usuario_id } = req.params;

  const sql = `
    SELECT id, nome, data
    FROM treinos
    WHERE usuario_id = ?
    ORDER BY data DESC
  `;

  db.query(sql, [usuario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar treinos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar treinos.' });
    }

    res.status(200).json(results);
  });
};

// Detalhes de um treino específico
const detalhesTreino = (req, res) => {
  const { id } = req.params;

  const sqlTreino = 'SELECT id, nome, data FROM treinos WHERE id = ?';

  db.query(sqlTreino, [id], (err, treinoResults) => {
    if (err || treinoResults.length === 0) {
      console.error('Erro ao buscar treino:', err);
      return res.status(404).json({ erro: 'Treino não encontrado.' });
    }

    const treino = treinoResults[0];

    const sqlExercicios = `
      SELECT e.nome, te.series, te.repeticoes, te.carga, te.observacoes
      FROM treino_exercicios te
      JOIN exercicios e ON te.exercicio_id = e.id
      WHERE te.treino_id = ?
    `;

    db.query(sqlExercicios, [id], (err2, exercicios) => {
      if (err2) {
        console.error('Erro ao buscar exercícios:', err2);
        return res.status(500).json({ erro: 'Erro ao buscar exercícios do treino.' });
      }

      res.status(200).json({
        id: treino.id,
        nome: treino.nome,
        data: treino.data,
        exercicios
      });
    });
  });
};

// Exporta apenas os necessários
module.exports = {
  listarExercicios,
  loginUsuario,
  salvarTreino,
  listarTreinosPorUsuario,
  detalhesTreino
};
