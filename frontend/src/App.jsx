import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginCadastro from "./pages/LoginCadastro";
import Dashboard from "./pages/Dashboard";
import NovoTreino from "./pages/NovoTreino"; // 👈
import Onboarding from "./pages/Onboarding";
import TreinoDia from "./pages/TreinoDia";
import ExercicioDetalhes from "./pages/ExercicioDetalhes";
import Perfil from "./pages/Perfil";
import Progresso from "./pages/Progresso";
import PagamentoPage from "./pages/PagamentoPage";
import AbandonoPage from "./pages/AbandonoPage";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Planos from "./pages/Planos";
import Obrigado from "./pages/Obrigado";
import TreinoPorGrupo from "./pages/TreinoPorGrupo";
import TreinoGerado from "./pages/TreinoGerado";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginCadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/novo-treino" element={<NovoTreino />} /> {/* 👈 nova rota */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/treino/:dia" element={<TreinoDia />} />
        <Route path="/exercicio/:id" element={<ExercicioDetalhes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/progresso" element={<Progresso />} />
        <Route path="/pagamento" element={<PagamentoPage />} />
        <Route path="/abandono" element={<AbandonoPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/treinoporgrupo" element={<TreinoPorGrupo />} />
        <Route path="/treinoporgrupo/treino" element={<TreinoGerado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
