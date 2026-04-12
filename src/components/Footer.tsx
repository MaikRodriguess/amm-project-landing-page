export default function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 border-t border-amm-orange border-opacity-20 py-12 px-8 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* About */}
        <div>
          <h3 className="text-amm-orange font-bold uppercase mb-4">AMM Brasil MC</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ministério dos Motociclistas Adventistas. O Seu Motoclube Cristão. Fundado em 2013, unindo fé e paixão pelas motos.
          </p>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-amm-orange font-bold uppercase mb-4">Redes Sociais</h3>
          <div className="flex gap-4 mb-4">
            <a
              href="https://www.instagram.com/ministerio.amm.brasil.mc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amm-orange text-black p-2 rounded-full hover:bg-opacity-80 transition text-lg"
            >
              📷
            </a>
            <a
              href="https://www.facebook.com/brasil.amm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amm-orange text-black p-2 rounded-full hover:bg-opacity-80 transition text-lg"
            >
              f
            </a>
            <a
              href="https://www.youtube.com/c/AMMBrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amm-orange text-black p-2 rounded-full hover:bg-opacity-80 transition text-lg"
            >
              ▶
            </a>
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center md:justify-end">
          <img
            src="https://i0.wp.com/amm-brasil.siteoficial.org.br/wp-content/uploads/2024/12/Logo-AMM-Brasil-ofcial-Branca-3.png?w=120&ssl=1"
            alt="AMM Brasil MC Logo"
            className="h-32 w-auto opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-xs space-y-2">
        <p>&copy; 2013-2025 AMM Brasil MC - Ministério dos Motociclistas Adventistas. Todos os direitos reservados.</p>
        <p className="text-gray-600 italic">
          Esta é uma página informativa criada por um membro. Não é oficial. Visite{' '}
          <a href="https://amm-brasil.siteoficial.org.br/" target="_blank" rel="noopener noreferrer" className="text-amm-orange hover:underline">
            amm-brasil.siteoficial.org.br
          </a>{' '}
          para informações oficiais.
        </p>
      </div>
    </footer>
  )
}
