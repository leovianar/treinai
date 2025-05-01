import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function Obrigado() {
  const navigate = useNavigate();

  useEffect(() => {
    // Dispara evento do Facebook Pixel
    if (window.fbq) {
      window.fbq("track", "Purchase", {
        value: 9.90,
        currency: 'BRL'
      });
    }

    // Evento do Google Analytics
    if (window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: new Date().getTime(),
        value: 9.9,
        currency: "BRL",
        items: [{
          item_name: "Plano TreinIA",
          price: 9.90,
          item_category: "fitness"
        }]
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden text-center">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 py-6 px-8">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-5xl text-white animate-bounce" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Pagamento confirmado!</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Obrigado por assinar o <span className="font-semibold text-green-600">TreinIA</span>. Seu plano de <span className="font-bold">R$9,90/mês</span> foi ativado com sucesso!
          </p>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <FaCheckCircle className="mr-2 text-green-600" />
              Próximos passos
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Você receberá um e-mail de confirmação
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Acesso imediato à plataforma
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Suporte disponível 24/7
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Acessar minha conta agora</span>
            <FaArrowRight className="ml-2" />
          </button>

          <p className="text-gray-500 text-sm mt-6">
            Em caso de dúvidas, entre em contato em <a href="mailto:suporte@treinia.com" className="text-green-600 hover:underline">suporte@treinia.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}