import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function NovoTreino() {
  const [nomeTreino, setNomeTreino] = useState("");
  const [exercicios, setExercicios] = useState([]);
  const [listaExercicios, setListaExercicios] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    fetch(`${API}/api/exercicios`)
      .then((res) => res.json())
      .then((data) => setListaExercicios(data))
      .catch((err) => console.error("Erro ao carregar exercícios:", err));
  }, []);

  const adicionarExercicio = () => {
    setExercicios([...exercicios, { exercicio_id: "", series: "", repeticoes: "", carga: "", observacoes: "" }]);
  };

  const handleExercicioChange = (index, field, value) => {
    const novos = [...exercicios];
    novos[index][field] = value;
    setExercicios(novos);
  };

  const salvarTreino = async () => {
    const corpo = {
      usuario_id: usuario.id,
      nome: nomeTreino,
      exercicios: exercicios
    };

    const resposta = await fetch("http://localhost:3001/api/treinos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    });

    const data = await resposta.json();
    alert(data.mensagem || data.erro);

    if (data.treino_id) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#e0e0e0] p-6">
     <Header />
      <h1 className="text-2xl font-bold text-[#94b053] mb-6">Criar novo treino</h1>

      <input
        type="text"
        placeholder="Nome do treino"
        className="w-full p-3 mb-4 border rounded-xl"
        value={nomeTreino}
        onChange={(e) => setNomeTreino(e.target.value)}
      />

      {exercicios.map((ex, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl mb-4 shadow space-y-2">
          <select
            className="w-full p-2 border rounded"
            value={ex.exercicio_id}
            onChange={(e) => handleExercicioChange(idx, "exercicio_id", e.target.value)}
          >
            <option value="">Selecione o exercício</option>
            {listaExercicios.map((exOpt) => (
              <option key={exOpt.id} value={exOpt.id}>{exOpt.nome}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Séries"
            className="w-full p-2 border rounded"
            value={ex.series}
            onChange={(e) => handleExercicioChange(idx, "series", e.target.value)}
          />
          <input
            type="text"
            placeholder="Repetições"
            className="w-full p-2 border rounded"
            value={ex.repeticoes}
            onChange={(e) => handleExercicioChange(idx, "repeticoes", e.target.value)}
          />
          <input
            type="text"
            placeholder="Carga"
            className="w-full p-2 border rounded"
            value={ex.carga}
            onChange={(e) => handleExercicioChange(idx, "carga", e.target.value)}
          />
          <input
            type="text"
            placeholder="Observações"
            className="w-full p-2 border rounded"
            value={ex.observacoes}
            onChange={(e) => handleExercicioChange(idx, "observacoes", e.target.value)}
          />
        </div>
      ))}

      <div className="flex gap-4">
        <button
          onClick={adicionarExercicio}
          className="p-3 bg-[#bdeb07] rounded-xl text-black font-semibold"
        >
          + Adicionar exercício
        </button>
        <button
          onClick={salvarTreino}
          className="p-3 bg-[#94b053] text-white rounded-xl font-semibold"
        >
          Salvar treino
        </button>
      </div>
    </div>
  );
}
