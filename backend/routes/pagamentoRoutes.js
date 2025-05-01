const express = require("express");
const router = express.Router();
const stripe = require("stripe")("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");

router.post("/criar-sessao", async (req, res) => {
  const { usuario_id, email } = req.body;

  try {
    // 1. Cria cliente Stripe (evita duplicar se já existir)
    const clientes = await stripe.customers.list({ email, limit: 1 });
    const cliente = clientes.data.length > 0 ? clientes.data[0] : await stripe.customers.create({ email });

    // 2. Cria sessão de checkout com assinatura
    const session = await stripe.checkout.sessions.create({
      customer: cliente.id,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1RCXYuBmZp1Dtzwz3qDfb7KV",
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
      },
      metadata: {
        usuario_id: usuario_id, // ✅ Agora o webhook vai conseguir ler
      },
      success_url: "https://treinai.site/obrigado",
      cancel_url: "https://treinai.site/abandono",
    });    
    

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar sessão Stripe:", error);
    res.status(500).json({ error: "Erro ao criar sessão de pagamento." });
  }
});

router.post("/cancelar/:id", async (req, res) => {
  const { id } = req.params;

  const db = require("../models/db");

  try {
    // Busca o subscription_id do usuário
    const [rows] = await db.promise().execute("SELECT subscription_id FROM usuarios WHERE id = ?", [id]);
    const subscriptionId = rows[0]?.subscription_id;

    if (!subscriptionId) {
      return res.status(400).json({ erro: "Assinatura não encontrada." });
    }

    // Cancela a assinatura no Stripe
    await stripe.subscriptions.cancel(subscriptionId);

    // Atualiza no banco
    await db.promise().execute(
      "UPDATE usuarios SET pagamento_ativo = 0, subscription_id = NULL WHERE id = ?",
      [id]
    );

    res.json({ sucesso: true });
  } catch (err) {
    console.error("Erro ao cancelar assinatura:", err);
    res.status(500).json({ erro: "Erro ao cancelar assinatura." });
  }
});


module.exports = router;
