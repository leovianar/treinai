import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";

const API = import.meta.env.VITE_API_URL;

export default function LoginCadastro() {
  const [modo, setModo] = useState("login");
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });

  useEffect(() => {
    const urlModo = searchParams.get("modo");
    if (urlModo === "cadastro") {
      setModo("cadastro");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      modo === "login"
        ? `${API}/api/login`
        : `${API}/api/usuarios`;
    try {
      const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        if (data.usuario) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          await atualizarDadosUsuario(data.usuario.id);

          const usuario = JSON.parse(localStorage.getItem("usuario"));
          if (!usuario.objetivo) {
            window.location.href = "/onboarding";
          } else {
            window.location.href = "/dashboard";
          }
          
        }
      } else {
        alert(data.erro || "Erro ao processar solicitação.");
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro de conexão com o servidor.");
    }
  };

  const atualizarDadosUsuario = async (id) => {
    try {
      const res = await fetch(`${API}/api/usuario/${id}`);
      const data = await res.json();
      if (data.usuario) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
      }
    } catch (err) {
      console.error("Erro ao atualizar dados do usuário:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e0e0]">
      <Header />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#94b053] mb-6">
          {modo === "login" ? "Entrar no TreinIA" : "Criar Conta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === "cadastro" && (
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />
          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-[#94b053] text-white font-semibold hover:bg-[#bdeb07]"
          >
            {modo === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {modo === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            className="text-[#bdeb07] underline"
            onClick={() => setModo(modo === "login" ? "cadastro" : "login")}
          >
            {modo === "login" ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
}
