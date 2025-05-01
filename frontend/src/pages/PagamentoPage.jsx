import { useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export default function PagamentoPage() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const iniciarPagamento = async () => {
    const res = await fetch(`${API}/api/pagamento/criar-sessao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario_id: usuario.id,
        email: usuario.email
      })
    });
    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao redirecionar para o pagamento.");
      console.error("❌ Resposta inválida da API:", data);
    }
    
  };

  useEffect(() => {
    if (!usuario) {
      alert("Você precisa estar logado");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Ative sua conta</h1>
        <p className="mb-6 text-gray-600">
          Ganhe acesso completo à plataforma com apenas R$9,90. Ative agora!
        </p>
        <button
          onClick={iniciarPagamento}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Fazer pagamento e liberar acesso
        </button>
      </div>
    </div>
  );
}
