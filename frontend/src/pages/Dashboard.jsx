import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [plano, setPlano] = useState([]);
  const navigate = useNavigate();

  const mapaTreinos = {
    A: "Segunda-feira",
    B: "Terça-feira",
    C: "Quarta-feira",
    D: "Quinta-feira",
    E: "Sexta-feira",
    F: "Sábado",
    G: "Domingo"
  };

  const hoje = new Date();
  const diaSemana = hoje.getDay(); // 0 = domingo
  const letras = ["G", "A", "B", "C", "D", "E", "F"]; // índice 0 = domingo = G
  const letraHoje = letras[diaSemana];
  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  });

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado || !usuarioLogado.id) {
      alert("Você precisa estar logado.");
      navigate("/");
      return;
    }

    setUsuario(usuarioLogado);

    fetch(`${API}/api/planos/${usuarioLogado.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Plano recebido:", data);
        const planoArray = data.planos || data.plano || [];
        if (Array.isArray(planoArray)) {
          setPlano(planoArray);
        } else {
          setPlano([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar plano:", err);
        setPlano([]);
      });
  }, []);

  const handleNovoTreino = () => {
    if (window.confirm("Tem certeza que deseja gerar um novo treino? Isso substituirá o atual.")) {
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 pt-20 p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#82837e]">
            Olá, {usuario?.nome}! 💪
          </h1>
          <button
            onClick={handleNovoTreino}
            className="bg-[#94b053] hover:bg-[#bdeb07] text-white px-4 py-2 rounded-xl text-sm font-medium"
          >
            Novo TreinoAI
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 text-gray-700 text-sm">
          <FaCalendarAlt className="text-[#94b053]" />
          <span className="capitalize">{dataFormatada}</span>
        </div>

        {/* Se for grátis, exibe o aviso */}
        {usuario?.pagamento_ativo !== 1 && (
          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded text-yellow-800">
            <p>
              Você está usando a versão <strong>Grátis</strong>. Assine o plano Premium para desbloquear recursos avançados como o seu progresso e conquistas!
            </p>
            <button
              onClick={() => navigate("/pagamento")}
              className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium"
            >
              Assinar agora
            </button>
          </div>
        )}

        {/* Treinos disponíveis para todos */}
        <h2 className="text-xl font-semibold text-[#94b053] mb-4 mt-6">
          Seu Treino Personalizado:
        </h2>

        {plano.length === 0 ? (
          <p className="text-gray-600">Nenhum plano encontrado.</p>
        ) : (
          <div className="space-y-10">
            {plano.map((dia, index) => {
              const nomeDia = mapaTreinos[dia.dia] || `Treino ${dia.dia}`;
              const isHoje = dia.dia === letraHoje;

              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 shadow border-l-4 transition ${
                    isHoje
                      ? "bg-green-100 border-[#94b053]"
                      : "bg-white border-[#94b053]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-[#94b053]">
                      {nomeDia}{" "}
                      {isHoje && <span className="text-sm text-gray-600">(Hoje)</span>}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {dia.exercicios.slice(0, 3).map((ex, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 bg-gray-100 rounded-xl max-w-3xl"
                      >
                        <div className="w-14 h-14 bg-gray-300 rounded-xl overflow-hidden">
                          <img
                            src={`/img/exercicios/${ex.imagem || "generic-exercise.png"}`}
                            alt={ex.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{ex.nome}</p>
                          <p className="text-sm text-gray-600">
                            {ex.series}x{ex.repeticoes} - Carga: {ex.carga}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/treino/${dia.dia}`}
                      className="inline-block bg-[#94b053] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#bdeb07]">
                      Ver Exercícios
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
