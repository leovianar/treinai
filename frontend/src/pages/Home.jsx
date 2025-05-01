import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";



import inicioImage from "/img/home/treino02.png";
import heroImage from "/img/home/treino01.png";
import dashboardImage from "/img/home/dashboard.png";
import treinoImage from "/img/home/treinodia.png";
import graficoImage from "/img/home/grafico.png";
import user1 from "/img/home/user1.png"; // Você pode substituir depois
import user2 from "/img/home/user2.png"; // Você pode substituir depois
import user3 from "/img/home/user3.png"; // Você pode substituir depois
import user4 from "/img/home/user4.png"; // Você pode substituir depois

export default function Home() {
  const [faqAtivo, setFaqAtivo] = useState(null);
  const [demoAtiva, setDemoAtiva] = useState(0);

  const demonstracoes = [
    {
      titulo: "Dashboard Inteligente",
      descricao:
        "Veja seus treinos organizados por dia da semana, com destaque para o treino de hoje. Visual limpo, prático e direto ao ponto.",
      imagem: dashboardImage,
      features: [
        "Treino do dia em destaque",
        "Botões de ação rápidos",
        "Visual moderno e funcional",
      ],
    },
    {
      titulo: "Plano de Treino Personalizado",
      descricao:
        "Receba um plano completo criado com base no seu objetivo, nível, local de treino e disponibilidade. Treine com eficiência.",
      imagem: treinoImage,
      features: [
        "Distribuição por dia da semana",
        "Exercícios de acordo com seu perfil",
        "Adapte e edite quando quiser",
      ],
    },
    {
      titulo: "Gráficos de Progresso",
      descricao:
        "Acompanhe sua evolução ao longo das semanas. Marque exercícios como concluídos e veja seu crescimento visualmente.",
      imagem: graficoImage,
      features: [
        "Gráfico semanal e mensal",
        "Nível de progresso",
        "Medalhas e conquistas",
      ],
    },
  ];

  const perguntas = [
    {
      pergunta: "❓ O que é o TreinAI?",
      resposta:
        "É uma plataforma inteligente que cria planos de treino personalizados para você com base nas suas metas e evolução.",
    },
    {
      pergunta: "❓ Preciso pagar para usar?",
      resposta:
        "Você pode testar gratuitamente por 7 dias. Após isso, será necessário escolher um plano mensal para continuar.",
    },
    {
      pergunta: "❓ Posso treinar em casa ou na academia?",
      resposta:
        "Sim! Você escolhe onde treina e o sistema monta o treino de acordo com o local e os equipamentos disponíveis.",
    },
    {
      pergunta: "❓ Posso editar meu treino depois?",
      resposta:
        "Sim! Você pode marcar exercícios como feitos, ocultar os que não quiser fazer e até adicionar novos exercícios manualmente.",
    },
  ];

  const depoimentos = [
    {
      nome: "Carlos Silva",
      foto: user1,
      texto: "Finalmente consegui ver resultados consistentes! O plano personalizado mudou completamente minha rotina de treinos.",
      nota: "5/5"
    },
    {
      nome: "Ana Oliveira",
      foto: user2,
      texto: "Acompanhar meu progresso com os gráficos me motiva muito mais do que eu imaginava. Recomendo!",
      nota: "5/5"
    },
    {
      nome: "Roberto Costa",
      foto: user3,
      texto: "Depois de anos tentando seguir treinos genéricos, finalmente encontrei algo feito para o MEU corpo e objetivos.",
      nota: "4.5/5"
    },
    {
      nome: "Juliana Santos",
      foto: user4,
      texto: "A interface é tão simples que até meu avô poderia usar. Mas os resultados são profissionais!",
      nota: "5/5"
    }
  ];

  const toggleFAQ = (index) => {
    setFaqAtivo(faqAtivo === index ? null : index);
  };

  const proximaDemo = () => {
    setDemoAtiva((prev) => (prev + 1) % demonstracoes.length);
  };

  const demoAnterior = () => {
    setDemoAtiva((prev) => (prev - 1 + demonstracoes.length) % demonstracoes.length);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow text-gray-900">

          {/* HERO */}
<section className="px-4 py-24 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
    {/* Conteúdo do lado esquerdo */}
    <div className="md:w-1/2 space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Transforme Seus Treinos com Tecnologia Avançada
      </h1>
      <p className="text-lg md:text-xl text-gray-600">
        A TreinAI é uma plataforma revolucionária que utiliza Inteligência Artificial para criar planos de treino 100% personalizados, adaptados ao seu corpo, objetivos e rotina.
      </p>
      <div className="pt-4">
        <a
          href="/login?modo=cadastro"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block transform hover:-translate-y-1 text-lg"
        >
          Começar agora, é grátis! ➞
        </a>
      </div>
    </div>

    {/* Imagem do lado direito */}
    <div className="md:w-1/2">
      <img
        src={inicioImage}
        alt="Treinamento personalizado"
        className="w-full h-auto rounded-xl shadow-xl object-cover"
      />
    </div>
  </div>
</section>

          {/* BENEFÍCIOS */}
          <section className="py-20 px-6 bg-gray-100">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
              A Solução Definitiva Para Seus Resultados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    titulo: "Treino Inteligente",
                    texto: "Feito para você com base em seus objetivos, local e tempo disponível.",
                    emoji: "🏋️"
                  },
                  {
                    titulo: "Controle de Progresso",
                    texto: "Marque seus treinos como feitos e acompanhe com gráficos intuitivos.",
                    emoji: "📊"
                  },
                  {
                    titulo: "Atualize Quando Quiser",
                    texto: "Refaça seu plano a qualquer momento com novos exercícios.",
                    emoji: "🔄"
                  },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-green-500 border-2 border-transparent"
                  >
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.titulo}</h3>
                    <p className="text-gray-600">{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section className="bg-gray-900 text-white py-24">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img
                  src={heroImage}
                  alt="Como funciona"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl font-bold mb-6">Pare de Perder Tempo com Treinos Que Não Funcionam!</h2>
                <p className="text-lg text-gray-300 mb-8">
                Você já se perguntou por que seus treinos não dão resultado? A resposta é simples: treinos genéricos não consideram SEU corpo, SEUS objetivos e SUA rotina.

                Esqueça aplicativos de academia básicos e limitados!

                Com a TreinAI, você tem um personal trainer digital que acompanha cada evolução do seu corpo, ajustando seus treinos em tempo real para levar você mais rápido ao seu tão sonhado objetivo - seja ele:
                </p>
                <ul className="space-y-4">
                  {[
                    "Definir o corpo",
                    "Ganhar massa muscular",
                    "Melhorar o condicionamento",
                    "Perder peso com saúde"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center text-white">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CARROSSEL DE DEMONSTRAÇÃO */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">Veja como é por dentro</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Interface clara, moderna e pensada para facilitar sua jornada de evolução.
      </p>
    </div>
    
    <div className="relative">
      <div className="flex overflow-hidden relative">
        {demonstracoes.map((demo, index) => (
          <div 
            key={index}
            className={`w-full flex-shrink-0 flex flex-col lg:flex-row items-center justify-center gap-8 p-4 transition-opacity duration-500 ${
              index === demoAtiva ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
            }`}
          >
            <div className="w-full lg:w-1/2 flex justify-center bg-white p-4 rounded-lg shadow-md">
              <img 
                src={demo.imagem} 
                alt={demo.titulo}
                className="w-full max-w-md object-contain"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <h3 className="text-2xl font-bold mb-4 text-green-600">{demo.titulo}</h3>
              <p className="text-gray-700 mb-4">{demo.descricao}</p>
              <ul className="space-y-2">
                {demo.features.map((feat, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span className="text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={demoAnterior} 
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-green-600 transition-colors duration-300"
        >
          ◀
        </button>
        <div className="flex items-center gap-2 mx-4">
          {demonstracoes.map((_, index) => (
            <button
              key={index}
              onClick={() => setDemoAtiva(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${demoAtiva === index ? "bg-green-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
        <button 
          onClick={proximaDemo} 
          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-green-600 transition-colors duration-300"
        >
          ▶
        </button>
      </div>
    </div>
  </div>
</section>

          {/* DEPOIMENTOS */}
          <section className="py-24 px-6 bg-gray-100">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                O que nossos usuários dizem
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {depoimentos.map((depoimento, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      <img 
                        src={depoimento.foto} 
                        alt={depoimento.nome}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{depoimento.nome}</h4>
                        <span className="text-yellow-500 font-semibold">{depoimento.nota}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 flex-grow">"{depoimento.texto}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PREÇOS E BENEFÍCIOS 
          <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">Tudo isso por apenas</h2>
                <div className="text-5xl font-extrabold text-green-600 mb-4">R$ 9,90/mês</div>
                <p className="text-xl text-gray-600">Experimente gratuitamente por 7 dias</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">O que você recebe:</h3>
                  <ul className="space-y-4">
                    {[
                      "Plano de treino 100% personalizado",
                      "Acompanhamento de progresso com gráficos",
                      "Atualizações ilimitadas do seu plano",
                      "Biblioteca com +200 exercícios",
                      "Suporte via chat 24/7",
                      "Acesso a comunidade exclusiva"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-green-500 text-xl">✓</span>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Experimente grátis</h3>
                  <p className="text-gray-600 mb-6">
                    Cadastre-se agora e tenha 7 dias gratuitos para testar todas as funcionalidades sem compromisso.
                  </p>
                  <a
                    href="/login?modo=cadastro" // Você pode alterar esse caminho depois
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block w-full text-center"
                  >
                    Começar teste grátis ➞
                  </a>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Sem cobrança durante o período de teste
                  </p>
                </div>
              </div>
            </div>
          </section>
          */}

          {/* FAQ 
          <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-4xl font-bold mb-16 text-gray-900">Perguntas Frequentes</h2>
              <div className="space-y-4">
                {perguntas.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left px-8 py-6 bg-green-600 hover:bg-green-700 text-white font-semibold flex justify-between items-center transition-colors duration-300"
                    >
                      <span className="text-lg">{item.pergunta}</span>
                      <span className="text-2xl">{faqAtivo === index ? "−" : "+"}</span>
                    </button>
                    {faqAtivo === index && (
                      <div className="px-8 py-6 text-gray-700 bg-white">
                        <p className="text-lg">{item.resposta}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          */}

          {/* CTA FINAL */}
          <section className="py-20 px-6 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Pronto para transformar seus treinos?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Comece hoje mesmo e sinta a diferença de um treino verdadeiramente personalizado.
              </p>
              <a
                href="/login?modo=cadastro"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block transform hover:-translate-y-1 text-lg"
              >
                Começar agora, é gratis! ➞
              </a>
            </div>
          </section>
        </main>
        <Footer /> 
      </div>
    </>
  );
}