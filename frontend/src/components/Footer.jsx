export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Seção de Selos de Garantia */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Selo 1 - Compra Segura */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium text-green-400">Compra 100% Segura</span>
              <span className="text-xs text-gray-400 mt-1">Pagamentos criptografados</span>
            </div>

            {/* Selo 2 - Site Protegido */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="font-medium text-green-400">Site Protegido</span>
              <span className="text-xs text-gray-400 mt-1">Dados sempre seguros</span>
            </div>

            {/* Selo 3 - Prêmio Inovação */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <span className="font-medium text-green-400">Inovação do Ano</span>
              <span className="text-xs text-gray-400 mt-1">Prêmio TechFit 2024</span>
            </div>

            {/* Selo 4 - Satisfação Garantida */}
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-green-400">Satisfação Garantida</span>
              <span className="text-xs text-gray-400 mt-1">7 dias grátis para testar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-green-500">Trein</span>
              <span className="text-white">IA</span>
            </h3>
            <p className="text-gray-400 mb-4">
              A revolução em treinos personalizados com inteligência artificial.
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TreinIA. Todos os direitos reservados.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/sobre" className="text-gray-400 hover:text-green-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/planos" className="text-gray-400 hover:text-green-400 transition-colors">
                  Planos e Preços
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-green-400 transition-colors">
                  Blog de Treinos
                </a>
              </li>
              <li>
                <a href="/duvidas" className="text-gray-400 hover:text-green-400 transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contato@treinia.com
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Seg a Sex, 9h às 18h
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <a href="/privacidade" className="text-gray-500 hover:text-green-400 text-sm">Política de Privacidade</a>
            <a href="/termos" className="text-gray-500 hover:text-green-400 text-sm">Termos de Uso</a>
            <a href="/reembolsos" className="text-gray-500 hover:text-green-400 text-sm">Política de Reembolsos</a>
          </div>
          
          <div className="flex space-x-4">
            {/* Ícones de Redes Sociais */}
            <a href="#" className="text-gray-400 hover:text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}