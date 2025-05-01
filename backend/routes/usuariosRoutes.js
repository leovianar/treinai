const express = require("express");
const router = express.Router();
const db = require("../models/db");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcryptjs');



// GET /api/usuario/:id - Retorna todos os dados do usuário
router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.promise().execute(
      "SELECT id, nome, email, idade, altura, peso, sexo, objetivo, nivel, local_treino, imagem, pagamento_ativo FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ usuario: rows[0] });
  } catch (err) {
    console.error("Erro ao buscar dados do usuário:", err);
    res.status(500).json({ erro: "Erro interno ao buscar usuário" });
  }
});

// Configuração do multer para salvar em /public/img/perfil
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/perfil/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `usuario-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Rota para atualizar imagem de perfil
router.post("/upload-foto/:id", upload.single("foto"), async (req, res) => {
  const usuario_id = req.params.id;
  const imagem = req.file.filename;

  try {
    await db
      .promise()
      .execute("UPDATE usuarios SET imagem = ? WHERE id = ?", [
        imagem,
        usuario_id,
      ]);

    res.json({ sucesso: true, imagem });
  } catch (err) {
    console.error("Erro ao salvar imagem:", err);
    res.status(500).json({ erro: "Erro ao salvar imagem" });
  }
});

// POST /api/usuarios - Cadastra novo usuário com senha criptografada
router.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se e-mail já está em uso
    const [existe] = await db.promise().execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Insere no banco de dados
    const [resultado] = await db.promise().execute(
      "INSERT INTO usuarios (nome, email, senha, imagem, pagamento_ativo) VALUES (?, ?, ?, ?, ?)",
      [nome, email, senhaCriptografada, "default-user.png", 0]
    );

    // Retorna usuário (sem a senha)
    const usuario = {
      id: resultado.insertId,
      nome,
      email,
      imagem: "default-user.png",
      pagamento_ativo: 0,
    };

    res.json({ usuario });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
});

// POST /api/login - Verifica login com senha criptografada
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuarios] = await db.promise().execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    console.log("Usuários encontrados:", usuarios); // 👈 ADICIONE ISSO

    if (usuarios.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado." });
    }

    const usuario = usuarios[0];
    console.log("Usuário:", usuario);

    // Compara a senha com a hash armazenada
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    // Remove a senha do retorno por segurançaF
    delete usuario.senha;

    res.json({ usuario });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
});


module.exports = router;
