import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaBrain, FaChartLine, FaUserEdit, FaAward, FaUsers, FaDumbbell } from 'react-icons/fa';

export default function Sobre() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mais que uma plataforma, uma revolução no fitness</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Combinando inteligência artificial com expertise em educação física para criar a experiência de treino mais personalizada do mercado
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Nossa História</h2>
              <p className="text-lg text-gray-600 mb-4">
                A TreinIA nasceu em 2022 da frustração de seus fundadores com os métodos ultrapassados de prescrição de exercícios. Como profissionais de educação física e especialistas em tecnologia, identificamos uma oportunidade única.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Desenvolvemos um algoritmo proprietário que analisa mais de 50 variáveis para criar planos de treino verdadeiramente personalizados, adaptando-se continuamente ao progresso de cada usuário.
              </p>
              <p className="text-lg text-gray-600">
                Hoje, ajudamos milhares de pessoas a alcançarem seus objetivos físicos com eficiência e segurança, democratizando o acesso a treinos de qualidade profissional.
              </p>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
              <img 
                src="/img/sobre/equipe.jpg" 
                alt="Equipe TreinIA" 
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">O que nos torna diferentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBrain className="text-4xl text-green-600" />,
                title: "Tecnologia Inteligente",
                description: "Algoritmos de IA que aprendem com seu progresso e ajustam seus treinos automaticamente"
              },
              {
                icon: <FaChartLine className="text-4xl text-green-600" />,
                title: "Resultados Comprovados",
                description: "Usuários relatam em média 47% mais resultados que com métodos tradicionais"
              },
              {
                icon: <FaUserEdit className="text-4xl text-green-600" />,
                title: "Flexibilidade Total",
                description: "Edite seu treino quando quiser - a IA se adapta às suas preferências"
              },
              {
                icon: <FaAward className="text-4xl text-green-600" />,
                title: "Expertise Profissional",
                description: "Desenvolvido por educadores físicos com mais de 15 anos de experiência"
              },
              {
                icon: <FaUsers className="text-4xl text-green-600" />,
                title: "Comunidade Ativa",
                description: "Acesso a grupos exclusivos para troca de experiências e motivação"
              },
              {
                icon: <FaDumbbell className="text-4xl text-green-600" />,
                title: "Para Todos os Níveis",
                description: "Desde iniciantes até atletas avançados encontram treinos desafiadores"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">Conheça nosso time</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Carlos Silva",
                role: "Fundador & CTO",
                bio: "PhD em Ciência do Esporte com especialização em análise de dados aplicados ao fitness",
                image: "/img/sobre/team1.jpg"
              },
              {
                name: "Dra. Ana Oliveira",
                role: "Diretora de Pesquisa",
                bio: "Educadora Física com mestrado em Fisiologia do Exercício e IA",
                image: "/img/sobre/team2.jpg"
              },
              {
                name: "Ricardo Mendes",
                role: "Diretor de Experiência do Usuário",
                bio: "Especialista em design de interfaces para aplicativos de saúde e fitness",
                image: "/img/sobre/team3.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-900">Nossos Valores</h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Missão</h3>
              <p className="text-lg text-gray-600">
                Democratizar o acesso a treinos personalizados de alta qualidade, utilizando tecnologia para tornar a experiência fitness mais eficiente, acessível e adaptada a cada indivíduo.
              </p>
            </div>
            
            <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Visão</h3>
              <p className="text-lg text-gray-600">
                Ser reconhecidos como a plataforma que revolucionou a forma como as pessoas se exercitam, tornando os treinos personalizados com IA o padrão ouro do mercado fitness global.
              </p>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Princípios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Personalização acima de tudo",
                "Ética no uso de dados",
                "Resultados baseados em ciência",
                "Acessibilidade inclusiva",
                "Inovação contínua",
                "Transparência radical"
              ].map((principle, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para experimentar o futuro dos treinos?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram seus corpos com nossa tecnologia.
          </p>
          <a
            href="/login?modo=cadastro"
            className="bg-white text-green-700 hover:bg-gray-100 font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block transform hover:-translate-y-1 text-lg"
          >
            Comece seu teste grátis
          </a>
        </div>
      </section>
    </div>
  );
}