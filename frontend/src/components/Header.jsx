import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [logado, setLogado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    setLogado(!!usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setLogado(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#94b053] text-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo alinhada à esquerda */}
        <h1 className="text-xl font-bold">TreinAI</h1>

        {/* Botão hambúrguer para mobile */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>

        {/* Links do menu */}
        <nav
          className={`${
            menuAberto ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-[#94b053] p-4 lg:p-0`}
        >
          {!logado ? (
            <>
              <Link to="/" className="block py-2 lg:py-0 hover:underline">Home</Link>
              <a href="/sobre" className="block py-2 lg:py-0 hover:underline">Sobre</a>
              <Link to="login?modo=cadastro" className="block py-2 lg:py-0 hover:underline">Cadastro</Link>
              <Link to="/login" className="block py-2 lg:py-0 hover:underline">Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block py-2 lg:py-0 hover:underline">Dashboard</Link>
              <Link to="/treinoporgrupo" className="block py-2 lg:py-0 hover:underline">Treino Por Grupo</Link>
              <Link to="/progresso" className="block py-2 lg:py-0 hover:underline">Progresso</Link>
              <Link to="/perfil" className="block py-2 lg:py-0 hover:underline">Perfil</Link>              
              <button onClick={handleLogout} className="block py-2 lg:py-0 hover:underline">Sair</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
