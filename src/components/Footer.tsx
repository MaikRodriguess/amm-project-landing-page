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
              href="https://www.youtube.com/c/AMMBrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amm-orange p-2 rounded-full hover:bg-opacity-80 transition"
              title="YouTube"
            >
              <svg className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/brasil.amm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amm-orange p-2 rounded-full hover:bg-opacity-80 transition"
              title="Facebook"
            >
              <svg className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ministerio.amm.brasil.mc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amm-orange p-2 rounded-full hover:bg-opacity-80 transition"
              title="Instagram"
            >
              <svg className="h-6 w-6" fill="white" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.192a5.81 5.81 0 1 1 0 11.616 5.81 5.81 0 0 1 0-11.616zm0 1.44a4.368 4.368 0 1 0 0 8.736 4.368 4.368 0 0 0 0-8.736zm8.288-1.584a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z"/>
              </svg>
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
