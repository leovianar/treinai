import { useEffect, useState } from "react";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_URL;

import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

export default function Progresso() {
  const [dados, setDados] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLocal) {
      alert("Você precisa estar logado.");
      window.location.href = "/login";
      return;
    }

    setUsuario(usuarioLocal);

    // Só busca os dados se for usuário premium
    if (usuarioLocal.pagamento_ativo === 1) {
      fetch(`${API}/api/progresso/${usuarioLocal.id}`)
        .then((res) => res.json())
        .then(setDados)
        .catch((err) => console.error("Erro ao carregar progresso:", err));
    }
  }, []);

  // Se não for premium, mostra aviso
  if (usuario && usuario.pagamento_ativo !== 1) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 p-6">
        <Header />
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold text-[#94b053] mb-4">Seu Progresso</h1>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded text-yellow-800">
            <p>
              Esta área é exclusiva para <strong>usuários Premium</strong>.
              Aqui você poderá visualizar gráficos com sua evolução, conquistas e desempenho semanal.
            </p>
            <button
              onClick={() => window.location.href = "/pagamento"}
              className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium"
            >
              Quero acessar agora
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 p-6">
        <Header />
        <div className="max-w-4xl mx-auto">Carregando progresso...</div>
      </div>
    );
  }

  const diasSemana = Object.keys(dados.frequencia_semanal);
  const valoresSemana = Object.values(dados.frequencia_semanal);

  const datasMensais = dados.evolucao_mensal.map((d) => d.data);
  const feitosMensais = dados.evolucao_mensal.map((d) => d.feitos);

  const gruposMusculares = Object.keys(dados.distribuicao_grupo_muscular);
  const valoresGrupos = Object.values(dados.distribuicao_grupo_muscular);

  const diasDesdeUltimaAtualizacao = Math.floor(
    (new Date() - new Date(dados.ultima_atualizacao_plano)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-6">
      <Header />
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 space-y-8">
        <h1 className="text-2xl font-bold text-[#94b053]">Seu Progresso</h1>

        {/* 📊 Gráfico semanal */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Exercícios feitos por dia da semana</h2>
          <Bar
            data={{
              labels: diasSemana,
              datasets: [
                {
                  label: "Exercícios feitos",
                  data: valoresSemana,
                  backgroundColor: "#94b053",
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
              },
            }}
          />
        </div>

        {/* 📈 Evolução ao longo do mês */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Evolução ao longo dos últimos dias</h2>
          <Line
            data={{
              labels: datasMensais,
              datasets: [
                {
                  label: "Exercícios concluídos por dia",
                  data: feitosMensais,
                  fill: false,
                  borderColor: "#94b053",
                  tension: 0.3,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>

        {/* 🍕 Distribuição muscular */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Distribuição dos grupos musculares</h2>
          <Pie
            data={{
              labels: gruposMusculares,
              datasets: [
                {
                  data: valoresGrupos,
                  backgroundColor: [
                    "#94b053",
                    "#bdeb07",
                    "#82837e",
                    "#ffe08a",
                    "#FF6384",
                    "#36A2EB",
                  ],
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        {/* 🏅 Nível e conquistas */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2">
          <p><strong>Nível atual:</strong> {dados.nivel}</p>
          <p><strong>Total de treinos:</strong> {dados.total_treinos}</p>
          <p><strong>Treinos este mês:</strong> {dados.total_mes}</p>
          <p><strong>Última atualização do plano:</strong> {dados.ultima_atualizacao_plano} ({diasDesdeUltimaAtualizacao} dias atrás)</p>

          <div className="mt-3">
            <h3 className="font-semibold">Conquistas desbloqueadas:</h3>
            <ul className="list-disc list-inside text-sm">
              {dados.conquistas.map((c, i) => (
                <li key={i} className={c.desbloqueado ? "text-green-600" : "text-gray-400"}>
                  {c.desbloqueado ? "✅ " : "🔒 "} {c.nome}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 💬 Sugestões & Motivação */}
        <div className="bg-white p-4 rounded-xl border border-[#94b053]">
          <h2 className="font-bold text-[#94b053] text-lg mb-2">📢 Motivação</h2>
          {dados.total_mes >= 5 && (
            <p className="text-green-700 font-semibold">Você completou {dados.total_mes} treinos este mês! Continue assim 💪</p>
          )}
          {diasDesdeUltimaAtualizacao >= 30 && (
            <p className="text-yellow-600 font-semibold mt-2">Já se passaram {diasDesdeUltimaAtualizacao} dias desde o último ajuste do seu treino. Que tal atualizar? 🔁</p>
          )}
        </div>
      </div>
    </div>
  );
}
