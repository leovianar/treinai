import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_URL;

export default function TreinoDia() {
  const { dia } = useParams();
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [exerciciosFeitos, setExerciciosFeitos] = useState([]);
  const [excluidos, setExcluidos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [grupoMuscular, setGrupoMuscular] = useState("Treino");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario) {
      alert("Você precisa estar logado.");
      window.location.href = "/";
      return;
    }

    fetch(`${API}/api/treino-dia/${usuario.id}/${dia}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const excluidosLocal = JSON.parse(localStorage.getItem(`excluidos-${usuario.id}-${dia}`)) || [];
        const feitos = JSON.parse(localStorage.getItem(`feitos-${usuario.id}-${dia}`)) || [];

        const ativos = data.filter((ex) => !excluidosLocal.includes(ex.id));
        setExercicios(ativos);
        setExerciciosFeitos(feitos);
        setExcluidos(excluidosLocal);

        if (ativos.length > 0 && ativos[0].grupo_muscular) {
          setGrupoMuscular(ativos[0].grupo_muscular);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar exercícios:", err);
        setLoading(false);
      });
  }, [dia]);

  const marcarFeito = (id) => {
    const atualizados = exerciciosFeitos.includes(id)
      ? exerciciosFeitos.filter((x) => x !== id)
      : [...exerciciosFeitos, id];

    setExerciciosFeitos(atualizados);
    localStorage.setItem(`feitos-${usuario.id}-${dia}`, JSON.stringify(atualizados));
  };

  const excluirExercicio = (id) => {
    if (!window.confirm("Deseja realmente excluir este exercício?")) return;

    const novosExcluidos = [...excluidos, id];
    setExcluidos(novosExcluidos);
    localStorage.setItem(`excluidos-${usuario.id}-${dia}`, JSON.stringify(novosExcluidos));
    setExercicios((prev) => prev.filter((ex) => ex.id !== id));
  };

  const buscarExercicios = async (texto) => {
    setPesquisa(texto);
    if (texto.length < 2) return setResultadosBusca([]);
    const res = await fetch(`${API}/api/buscar-exercicios?termo=${texto}`);
    const data = await res.json();
    setResultadosBusca(data.exercicios || []);
  };

  const adicionarExercicio = async (exercicio) => {
    try {
      await fetch(`${API}/api/exercicio-do-plano`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plano_id: exercicios[0]?.plano_id,
          nome: exercicio.nome,
          nome_exercicio: exercicio.nome, // <-- adicione isso aqui!
          series: "3",
          repeticoes: "10",
          carga: "Média",
          dia: dia,
          imagem: exercicio.imagem_url || "generic-exercise.png",
        }),
      });
      

      setExercicios((prev) => [...prev, { ...exercicio, id: Date.now() }]);
      setPesquisa("");
      setResultadosBusca([]);
    } catch (err) {
      console.error("Erro ao adicionar:", err);
      alert("Erro ao adicionar exercício.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-6">
      <Header />
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-[#82837e]">
            {grupoMuscular ? `Treino de ${grupoMuscular}` : `Treino ${dia}`}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setModoEdicao(!modoEdicao)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              {modoEdicao ? "Sair da Edição" : "Editar Treino"}
            </button>
            <input
              type="text"
              placeholder="Buscar exercício..."
              className="px-3 py-2 border rounded-lg w-full sm:w-64"
              value={pesquisa}
              onChange={(e) => buscarExercicios(e.target.value)}
            />
          </div>
        </div>

        {resultadosBusca.length > 0 && (
          <div className="bg-white rounded-xl shadow p-4 space-y-2">
            <p className="font-semibold text-[#94b053]">Resultados:</p>
            {resultadosBusca.map((ex) => (
              <div key={ex.id} className="flex justify-between items-center">
                <span>{ex.nome}</span>
                <button
                  className="text-sm bg-[#94b053] text-white px-3 py-1 rounded hover:bg-[#bdeb07]"
                  onClick={() => adicionarExercicio(ex)}
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : exercicios.length === 0 ? (
          <p className="text-gray-600">Nenhum exercício encontrado.</p>
        ) : (
          <div className="space-y-4">
            {exercicios.map((ex, index) => (
              <div
              key={`${ex.id}-${index}`} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border-l-4 border-[#94b053]"
              >
                <input
                  type="checkbox"
                  checked={exerciciosFeitos.includes(ex.id)}
                  onChange={() => marcarFeito(ex.id)}
                  className="accent-[#94b053]"
                  title="Marcar como feito"
                />
                <Link to={`/exercicio/${ex.id}`} className="flex items-center gap-4 flex-1 hover:bg-gray-50 transition">
                  <div className="w-14 h-14 bg-gray-300 rounded-xl overflow-hidden">
                    <img
                      src={`/img/exercicios/${ex.imagem || "generic-exercise.png"}`}
                      alt={ex.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#94b053]">{ex.nome}</h3>
                    <p className="text-sm text-gray-600">
                      {ex.series}x{ex.repeticoes} - Carga: {ex.carga}
                    </p>
                  </div>
                </Link>
                {modoEdicao && (
                  <button
                    onClick={() => excluirExercicio(ex.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Excluir exercício"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
