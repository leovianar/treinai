import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCheck, FaDumbbell, FaChartLine, FaUserShield, FaMobileAlt } from 'react-icons/fa';

export default function PlanoUnico() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Plano TreinIA por apenas R$9,90/mês</h1>
          <p className="text-xl mb-6">Tudo que você precisa para evoluir nos treinos</p>
          <a 
            href="/assinar" 
            className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md inline-block transition-all duration-300 transform hover:scale-105"
          >
            Assinar Agora
          </a>
        </div>
      </section>

      {/* Destaques do Plano */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaDumbbell className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Treinos Personalizados</h3>
            <p className="text-gray-600">Planos adaptados ao seu nível e objetivos</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaChartLine className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Acompanhamento</h3>
            <p className="text-gray-600">Acompanhe seu progresso com métricas simples</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaMobileAlt className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Acesso Total</h3>
            <p className="text-gray-600">Use em qualquer dispositivo, a qualquer hora</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">O que você recebe por R$9,90/mês</h2>
            <p className="text-gray-600 mb-6">Tudo isso incluso no plano:</p>
            
            <ul className="space-y-3 text-left mb-8">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Plano de treino personalizado inicial</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Ajustes mensais na sua rotina de exercícios</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Acesso a mais de 100 exercícios detalhados</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Gráficos simples de acompanhamento</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Suporte por e-mail</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>Aplicativo para iOS e Android</span>
              </li>
            </ul>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="font-semibold">7 dias grátis para testar</p>
              <p className="text-sm text-gray-600">Cancele a qualquer momento nos primeiros 7 dias sem pagar nada</p>
            </div>

            <a 
              href="/assinar" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md inline-block transition-colors duration-300 w-full text-center"
            >
              Quero Meu Plano por R$9,90
            </a>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-md inline-block">
            <h2 className="text-2xl font-bold mb-4">Sem riscos, garantido</h2>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              Se em 7 dias você não estiver satisfeito, devolvemos seu dinheiro sem perguntas.
            </p>
            <FaUserShield className="text-4xl text-green-600 mx-auto" />
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Dúvidas Frequentes</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">Como funciona o pagamento?</h3>
            <p className="text-gray-600">
              O pagamento é recorrente mensal no cartão de crédito. Você será cobrado R$9,90 todo mês no mesmo dia em que assinou.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">Posso cancelar quando quiser?</h3>
            <p className="text-gray-600">
              Sim! O cancelamento é simples e pode ser feito a qualquer momento pelo seu painel. Não cobramos taxas de cancelamento.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">Preciso pagar pelos 7 dias grátis?</h3>
            <p className="text-gray-600">
              Não. Você só precisa informar um cartão válido, mas só será cobrado após os 7 dias de teste.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-xl mb-6">Por apenas R$9,90 por mês</p>
        <a 
          href="/assinar" 
          className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md inline-block transition-colors duration-300"
        >
          Assinar Agora
        </a>
      </section>
    </div>
  );
}