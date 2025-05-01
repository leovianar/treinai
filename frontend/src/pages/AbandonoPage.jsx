import Header from "../components/Header";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AbandonoPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pt-20 p-6 text-center">
      <Header />
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10">
        <h1 className="text-2xl font-bold text-[#82837e] mb-4">Compra não finalizada</h1>
        <p className="text-gray-600 mb-6">
          Parece que você cancelou ou fechou o pagamento. Se tiver alguma dúvida ou precisar de ajuda, estamos aqui para isso!
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-[#94b053] hover:bg-[#bdeb07] text-white px-6 py-3 rounded-lg font-medium"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
}
