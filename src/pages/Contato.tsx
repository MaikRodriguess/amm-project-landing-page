import { ExternalLink } from 'lucide-react'

export default function Contato() {
  return (
    <div className="min-h-screen bg-amm-dark text-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Contato</h1>
          <p className="text-lg text-gray-300">Fale conosco e faça parte da nossa comunidade</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Social Media */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-amm-orange mb-10 uppercase">Redes Sociais</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/ministerio.amm.brasil.mc/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">📷</span>
                  <h3 className="text-2xl font-bold">Instagram</h3>
                </div>
                <p className="text-sm text-gray-100 mb-4">Siga-nos para atualizações diárias, fotos e vídeos dos nossos eventos.</p>
                <p className="text-white font-bold flex items-center gap-2">
                  @ministerio.amm.brasil.mc <ExternalLink size={16} />
                </p>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/brasil.amm"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-8 rounded-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">f</span>
                  <h3 className="text-2xl font-bold">Facebook</h3>
                </div>
                <p className="text-sm text-gray-100 mb-4">Acompanhe nossos eventos, notícias e interaja com a comunidade.</p>
                <p className="text-white font-bold flex items-center gap-2">
                  brasil.amm <ExternalLink size={16} />
                </p>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/c/AMMBrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 p-8 rounded-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">▶</span>
                  <h3 className="text-2xl font-bold">YouTube</h3>
                </div>
                <p className="text-sm text-gray-100 mb-4">Assista nossos moto cultos, palestras e conteúdo exclusivo.</p>
                <p className="text-white font-bold flex items-center gap-2">
                  AMM Brasil <ExternalLink size={16} />
                </p>
              </a>
            </div>
          </div>

          {/* Página Oficial */}
          <div>
            <h2 className="text-3xl font-bold text-amm-orange mb-6 uppercase">Página Oficial</h2>
            <a
              href="https://amm-brasil.siteoficial.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amm-orange to-orange-500 p-8 rounded-lg hover:shadow-xl transition transform hover:scale-105 inline-block w-full"
            >
              <h3 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
                AMM Brasil MC Oficial <ExternalLink size={20} className="text-black" />
              </h3>
              <p className="text-black text-base">
                Visite nosso site oficial para mais informações completas sobre o motoclube, eventos e atualizações.
              </p>
            </a>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-amm-orange to-transparent p-8 rounded-lg mt-12 text-center">
            <p className="text-2xl font-bold text-black uppercase">
              Qualquer dúvida? Estamos aqui para ajudar!
            </p>
            <p className="text-gray-900 mt-2">
              Não hesite em entrar em contato conosco através de qualquer um de nossos canais.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
