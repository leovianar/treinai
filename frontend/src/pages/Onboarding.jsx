import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Onboarding() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7; // Total de etapas

  const [form, setForm] = useState({
    idade: "",
    altura: "",
    peso: "",
    sexo: "",
    objetivo: "",
    diasPorSemana: "",
    localTreino: "",
    nivel: ""
  });

  useEffect(() => {
    if (!usuario) {
      alert("Você precisa estar logado.");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const perfilCompleto = { ...usuario, ...form };
    localStorage.setItem("perfil", JSON.stringify(perfilCompleto));
    localStorage.setItem("usuario", JSON.stringify(perfilCompleto));

    const resposta = await fetch(`${API}/api/gerar-treino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        nome: usuario.nome,
        usuario_id: usuario.id,
      }),
    });

    const data = await resposta.json();
    localStorage.setItem("treinoPersonalizado", JSON.stringify(data.plano));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Barra de progresso */}
        <div className="px-6 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-500 mt-1">
            Etapa {currentStep} de {totalSteps}
          </p>
        </div>

        <div className="p-6">
          {/* Etapa 1 - Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800">Seus dados básicos</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                  <input
                    name="idade"
                    type="number"
                    min={10}
                    max={100}
                    required
                    placeholder="Anos"
                    value={form.idade}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altura</label>
                  <input
                    name="altura"
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ex: 1.75"
                    value={form.altura}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso</label>
                  <input
                    name="peso"
                    type="number"
                    step="0.1"
                    required
                    placeholder="kg"
                    value={form.peso}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Etapa 2 - Sexo */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800">Com qual você se identifica?</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, sexo: "Masculino" }));
                    nextStep();
                  }}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${form.sexo === "Masculino" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-4xl mb-2">👨</span>
                  <span>Masculino</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, sexo: "Feminino" }));
                    nextStep();
                  }}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${form.sexo === "Feminino" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-4xl mb-2">👩</span>
                  <span>Feminino</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, sexo: "Outro" }));
                    nextStep();
                  }}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${form.sexo === "Outro" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-4xl mb-2">🧑</span>
                  <span>Outro</span>
                </button>
              </div>
            </div>
          )}

          {/* Etapa 3 - Objetivo */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800">Qual seu principal objetivo?</h2>
              
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, objetivo: "Hipertrofia" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.objetivo === "Hipertrofia" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">💪</span>
                  <span>Hipertrofia (ganhar massa)</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, objetivo: "Emagrecimento" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.objetivo === "Emagrecimento" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">🔥</span>
                  <span>Emagrecimento</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, objetivo: "Resistência" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.objetivo === "Resistência" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">🏃</span>
                  <span>Resistência</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, objetivo: "Força" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.objetivo === "Força" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">🏋️</span>
                  <span>Força</span>
                </button>
              </div>
            </div>
          )}

  {/* Etapa 4 - Dias por semana (entrada manual) */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Quantos dias por semana você treina?</h2>
          <p className="text-center text-gray-600">📅 Digite um número de <strong>1 a 7</strong></p>

          <div className="flex justify-center">
            <input
              type="number"
              name="diasPorSemana"
              min={1}
              max={7}
              required
              value={form.diasPorSemana}
              onChange={handleChange}
              placeholder="Ex: 4"
              className="w-1/2 p-3 border-2 border-gray-300 rounded-xl text-center text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      )}



          {/* Etapa 5 - Local de treino */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800">Onde você vai treinar?</h2>
              <p className="text-gray-600">🏋️ Escolha seu ambiente principal</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, localTreino: "Casa" }));
                    nextStep();
                  }}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${form.localTreino === "Casa" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-3xl mb-2">🏠</span>
                  <span>Em casa</span>
                  <small className="text-gray-500">Com equipamentos básicos</small>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, localTreino: "Academia" }));
                    nextStep();
                  }}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${form.localTreino === "Academia" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-3xl mb-2">🏢</span>
                  <span>Academia</span>
                  <small className="text-gray-500">Acesso completo</small>
                </button>
              </div>
            </div>
          )}

          {/* Etapa 6 - Nível atual */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800">Qual seu nível atual?</h2>
              <p className="text-gray-600">📊 Selecione conforme sua experiência</p>
              
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, nivel: "Iniciante" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.nivel === "Iniciante" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">🆕</span>
                  <div className="text-left">
                    <span className="block font-medium">Iniciante</span>
                    <small className="text-gray-500">Começando agora nos treinos</small>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, nivel: "Intermediário" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.nivel === "Intermediário" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">📈</span>
                  <div className="text-left">
                    <span className="block font-medium">Intermediário</span>
                    <small className="text-gray-500">Já tenho alguma experiência</small>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, nivel: "Avançado" }));
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-lg flex items-center transition-all ${form.nivel === "Avançado" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                >
                  <span className="text-2xl mr-3">🚀</span>
                  <div className="text-left">
                    <span className="block font-medium">Avançado</span>
                    <small className="text-gray-500">Treino regularmente há anos</small>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Etapa 7 - Resumo e confirmação */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800">Confira seus dados</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Idade:</span>
                    <span className="font-medium">{form.idade} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Altura/Peso:</span>
                    <span className="font-medium">{form.altura}m • {form.peso}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sexo:</span>
                    <span className="font-medium">{form.sexo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Objetivo:</span>
                    <span className="font-medium">{form.objetivo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dias de treino:</span>
                    <span className="font-medium">{form.diasPorSemana === "7" ? "7 dias" : form.diasPorSemana + " dias"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Local:</span>
                    <span className="font-medium">{form.localTreino}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nível:</span>
                    <span className="font-medium">{form.nivel}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-center">
                Estes dados serão usados para criar seu treino personalizado.
              </p>
            </div>
          )}

          {/* Navegação */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && currentStep < 7 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Voltar
              </button>
            ) : (
              <div></div> // Espaço vazio para manter o alinhamento
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!form.idade || !form.altura || !form.peso)) ||
                  (currentStep === 3 && !form.objetivo) ||
                  (currentStep === 4 && (!form.diasPorSemana || form.diasPorSemana < 1 || form.diasPorSemana > 7)) ||
                  (currentStep === 5 && !form.localTreino) ||
                  (currentStep === 6 && !form.nivel)
                }
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            ) : currentStep === 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Revisar Dados
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Confirmar e Gerar Treino
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}