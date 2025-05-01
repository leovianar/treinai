import { useEffect, useState } from "react";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_URL;

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!user) {
      alert("Você precisa estar logado.");
      window.location.href = "/";
    } else {
      fetch(`${API}/api/usuario/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.usuario) {
            setUsuario(data.usuario);
            localStorage.setItem("usuario", JSON.stringify(data.usuario)); // ATUALIZA O LOCALSTORAGE
          }
        })
        .catch(() => {
          alert("Erro ao carregar dados do perfil.");
        });
    }
  }, []);
  
  

  if (!usuario) return <p className="text-center mt-10">Carregando perfil...</p>;

  const cancelarAssinatura = async () => {
    const confirmar = confirm("Tem certeza que deseja cancelar sua assinatura?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API}/api/pagamento/cancelar/${usuario.id}`, {
        method: "POST",
      });
      const data = await resposta.json();

      if (data.sucesso) {
        alert("Assinatura cancelada com sucesso!");
        const novoUsuario = { ...usuario, pagamento_ativo: 0 };
        setUsuario(novoUsuario);
        localStorage.setItem("usuario", JSON.stringify(novoUsuario));
      } else {
        alert("Erro ao cancelar assinatura.");
      }
    } catch (err) {
      alert("Erro na comunicação com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16 md:pt-20 p-4 md:p-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6 space-y-6 mt-4 sm:mt-10">
        <h1 className="text-2xl font-bold text-[#94b053]">Seu Perfil</h1>

        {/* Seção de Foto e Dados Básicos - Refatorada */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Container da Foto - Agora ocupa toda a largura no mobile */}
          <div className="w-40 h-40 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#94b053] bg-gray-200 mx-auto md:mx-0">
            <img
              src={`${API}/img/perfil/${usuario.imagem}?t=${Date.now()}`}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dados Básicos - Agora em coluna abaixo da foto no mobile */}
          <div className="text-center md:text-left space-y-2 w-full md:w-auto">
            <p className="text-lg font-medium">{usuario.nome}</p>
            <p className="text-gray-600">{usuario.email}</p>
            <p className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${usuario.pagamento_ativo ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
              {usuario.pagamento_ativo ? "Premium ✅" : "Grátis 🔒"}
            </p>
          </div>
        </div>

        {/* Grid de Informações - Refatorada para mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Idade</p>
            <p>{usuario.idade || "Não informado"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Altura</p>
            <p>{usuario.altura ? `${usuario.altura}m` : "Não informado"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Peso</p>
            <p>{usuario.peso ? `${usuario.peso}kg` : "Não informado"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Sexo</p>
            <p>{usuario.sexo || "Não informado"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Objetivo</p>
            <p>{usuario.objetivo || "Não informado"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Nível</p>
            <p>{usuario.nivel || "Não informado"}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-500">Local do treino</p>
            <p>{usuario.local_treino || "Não informado"}</p>
          </div>
        </div>

        {/* Botões - Centralizados no mobile */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <label className="cursor-pointer bg-[#94b053] hover:bg-[#bdeb07] text-white font-semibold px-4 py-2 rounded-xl text-center transition-colors">
            Alterar Foto
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                // ... (mantenha a lógica existente)
              }}
              className="hidden"
            />
          </label>

          {usuario.pagamento_ativo === 1 && (
            <button
              onClick={cancelarAssinatura}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Cancelar assinatura
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
