import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_URL;

export default function TreinoGerado() {
  const [searchParams] = useSearchParams();
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const grupos = searchParams.get("grupos")?.split(",") || [];

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const res = await fetch(`${API}/api/exercicios-do-grupo?grupos=${grupos.join(",")}`);
        const data = await res.json();
        setExercicios(data);
      } catch (err) {
        console.error("Erro ao carregar treino por grupo:", err);
      } finally {
        setLoading(false);
      }
    };

    if (grupos.length > 0) {
      fetchExercicios();
    }
  }, [grupos]);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-6">
      <Header />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-[#82837e]">
          Treino Gerado {grupos.length > 0 && `(${grupos.join(", ")})`}
        </h1>

        {loading ? (
          <p className="text-gray-600">Carregando...</p>
        ) : exercicios.length === 0 ? (
          <p className="text-gray-600">Nenhum exercício encontrado.</p>
        ) : (
          <div className="space-y-4">
            {exercicios.map((ex, index) => (
              <Link
                to={`/exercicio/${ex.id}`}
                key={`${ex.id}-${ex.nome}-${index}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow border-l-4 border-[#94b053] hover:bg-gray-50 transition"
              >
                <div className="w-14 h-14 bg-gray-300 rounded-xl overflow-hidden">
                  <img
                    src={`/img/exercicios/${ex.imagem || ex.imagem_url || "generic-exercise.png"}`}
                    alt={ex.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[#94b053]">{ex.nome}</h3>
                  <p className="text-sm text-gray-600">
                    {(ex.series || 3)}x{(ex.repeticoes || 10)} - Carga: {ex.carga || "Média"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
