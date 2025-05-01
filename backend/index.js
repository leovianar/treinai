const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3001;

require("dotenv").config({ path: ".env.local" });

// 1️⃣ CORS
const allowedOrigins = [
  "http://localhost:5173", // React rodando localmente
  "https://treinai.site"   // Produção
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requests sem origin (ex: curl, mobile) ou de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// ✅ Webhook Stripe antes do express.json
const stripeWebhook = require("./routes/stripeWebhook");
app.use("/api/pagamento", stripeWebhook);

// 2️⃣ express.json depois do webhook
app.use(express.json());

// 3️⃣ Arquivos estáticos
app.use("/img", express.static(path.join(__dirname, "public", "img")));

// 4️⃣ Outras rotas
const geradorTreino = require("./routes/geradorTreino");
const salvarPlanoRoute = require("./routes/salvarPlano");
const treinoRoutes = require("./routes/treinoRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const planosRoutes = require("./routes/planosRoutes");
const progressoRoutes = require("./routes/progressoRoutes");
const pagamentoRoutes = require("./routes/pagamentoRoutes");

app.use("/api", geradorTreino);
app.use("/api", salvarPlanoRoute);
app.use("/api", treinoRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", planosRoutes);
app.use("/api", progressoRoutes);
app.use("/api/pagamento", pagamentoRoutes);

// 5️⃣ Rota padrão
app.get("/", (req, res) => {
  res.send("API do TreinIA está online!");
});

// 6️⃣ Start servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
