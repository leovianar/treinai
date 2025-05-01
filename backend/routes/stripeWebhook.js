const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const db = require("../models/db");

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    console.log("--- Nova Requisição de Webhook ---");
    console.log("Headers:", req.headers);
    console.log("Body (cru):", req.body); // Log do body cru

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("✅ Webhook assinado e verificado com sucesso!");
        console.log("Evento recebido:", event.type);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log("Dados da sessão:", session);

            const usuarioId = session.metadata?.usuario_id;
            const subscriptionId = session.subscription;

            console.log("usuarioId (metadata):", usuarioId);
            console.log("subscriptionId (session):", subscriptionId);

            if (!usuarioId || !subscriptionId) {
                console.error("❌ Dados ausentes na sessão:", session);
                return res.status(400).send("Metadados de usuário ou ID de assinatura ausentes.");
            }

            const [result] = await db.promise().execute(
                `UPDATE usuarios
                 SET pagamento_ativo = 1, subscription_id = ?
                 WHERE id = ?`,
                [subscriptionId, usuarioId]
            );

            console.log("Resultado da atualização do banco de dados:", result);

            if (result.affectedRows === 0) {
                console.error("⚠️ Usuário não encontrado no banco de dados:", usuarioId);
                return res.status(404).json({ error: "Usuário não encontrado" });
            }

            console.log(`✅ Pagamento confirmado e banco de dados atualizado para o usuário ${usuarioId}`);
            return res.status(200).json({ success: true });
        }

        console.log("ℹ️ Evento não é checkout.session.completed:", event.type);
        return res.status(200).json({ received: true });

    } catch (err) {
        console.error("❌ Erro ao processar webhook:", err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
});

module.exports = router;