import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_URL;

export default function ExercicioDetalhes() {
  const { id } = useParams();
  const [exercicio, setExercicio] = useState(null);

  useEffect(() => {
    const buscarExercicio = async () => {
      try {
        // Primeiro tenta buscar em exercicio-do-plano (Treino do dia)
        let res = await fetch(`${API}/api/exercicio-do-plano/${id}`);
        let data;

        if (res.ok) {
          data = await res.json();
          setExercicio(data.exercicio);
        } else {
          // Se não encontrou, tenta em exercicios (Treino por grupo)
          res = await fetch(`${API}/api/exercicio/${id}`);
          if (res.ok) {
            data = await res.json();
            setExercicio(data.exercicio);
          } else {
            console.warn("Exercício não encontrado.");
            setExercicio(null);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar exercício:", err);
        setExercicio(null);
      }
    };

    buscarExercicio();
  }, [id]);

  if (!exercicio) {
    return <p className="text-center mt-10">Carregando exercício...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 p-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-[#94b053] mb-4">
          {exercicio.nome}
        </h1>

        <div className="flex gap-6 mb-6">
          <div className="w-40 h-40 rounded-xl bg-gray-200 overflow-hidden">
            <img
              src={`/img/exercicios/${exercicio.imagem_url || exercicio.imagem || "generic-exercise.png"}`}
              alt={exercicio.nome}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-2 text-gray-700">
            <p><strong>Séries:</strong> {exercicio.series || "Não informado"}</p>
            <p><strong>Repetições:</strong> {exercicio.repeticoes || "Não informado"}</p>
            <p><strong>Carga:</strong> {exercicio.carga || "Não informada"}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#82837e] mb-2">Descrição</h2>
          <p className="text-gray-600">
            {exercicio.descricao || "Sem descrição cadastrada."}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#82837e] mb-2">Dicas</h2>
          {exercicio.dicas ? (
            <ul className="list-disc ml-5 text-gray-600">
              {exercicio.dicas.split(". ").map((dica, i) => (
                <li key={i}>{dica.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma dica disponível.</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-[#82837e] mb-2">Vídeo explicativo</h2>
          {exercicio.video_url ? (
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-black">
              <iframe
                width="100%"
                height="315"
                src={exercicio.video_url}
                title="Vídeo explicativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-gray-600">Nenhum vídeo disponível para este exercício.</p>
          )}
        </div>
      </div>
    </div>
  );
}
