import ClippedButton from '../components/ClippedButton'
import { CheckCircle, Users, Heart, Zap, ExternalLink, Download, FileText, BookOpen } from 'lucide-react'

const VIDEO_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co/storage/v1/object/public/video/AMM/Corte-Site-Fundo.mp4'

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ opacity: 1 }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Dark overlay for better text contrast */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-start h-full px-8 md:px-16 pt-40 md:pt-48">
          {/* Main Content */}
          <div className="max-w-2xl">
            {/* Tagline */}
            <p className="text-amm-orange text-sm md:text-base font-bold uppercase tracking-widest mb-4">
              Bem-vindo ao
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-6 text-white">
              AMM Brasil MC
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl font-light text-amm-orange mb-8">
              O Seu Motoclube Cristão
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-200 max-w-lg mb-8 leading-relaxed">
              Ministério dos Motociclistas Adventistas. Rodando para salvar vidas através da fé e paixão pelas motos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollToSection('materiais')}
                className="clipped-button clipped-button-orange text-base md:text-lg px-8 md:px-10 hover:opacity-80 transition"
              >
                Materiais
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2">
                <p className="text-white text-sm uppercase font-bold">Siga-nos:</p>
                <a
                  href="https://www.instagram.com/ministerio.amm.brasil.mc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amm-orange text-black p-3 rounded-full hover:bg-opacity-80 transition transform hover:scale-110 text-2xl"
                >
                  📷
                </a>
                <a
                  href="https://www.facebook.com/brasil.amm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amm-orange text-black p-3 rounded-full hover:bg-opacity-80 transition transform hover:scale-110 text-2xl"
                >
                  f
                </a>
                <a
                  href="https://www.youtube.com/c/AMMBrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amm-orange text-black p-3 rounded-full hover:bg-opacity-80 transition transform hover:scale-110 text-2xl"
                >
                  ▶
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('sobre')}
        >
          <div className="w-6 h-10 border-2 border-amm-orange rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-amm-orange rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Materiais Section */}
      <section id="materiais" className="min-h-screen bg-amm-dark text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Materiais</h1>
            <p className="text-lg text-gray-300">Recursos, documentos e materiais de apoio do AMM Brasil MC</p>
          </div>
        </div>

        {/* Content */}
        <div className="py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <p className="text-gray-300 text-lg mb-12 text-center leading-relaxed">
              Confira nossos materiais e recursos disponíveis para membros e interessados em conhecer mais sobre o AMM Brasil MC.
            </p>

            {/* Materials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Documentos */}
              <div className="bg-amm-orange bg-opacity-10 border-2 border-amm-orange rounded-lg p-8 hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={32} className="text-amm-orange" />
                  <h3 className="text-xl font-bold text-amm-orange">Documentos</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Acesse nossos documentos oficiais, estatutos e informações importantes sobre o motoclube.
                </p>
                <button className="clipped-button clipped-button-white text-sm px-6 hover:opacity-80 transition">
                  Ver Documentos
                </button>
              </div>

              {/* Guias e Tutoriais */}
              <div className="bg-amm-orange bg-opacity-10 border-2 border-amm-orange rounded-lg p-8 hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={32} className="text-amm-orange" />
                  <h3 className="text-xl font-bold text-amm-orange">Guias</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Guias práticos e tutoriais para ajudá-lo a participar dos nossos eventos e ações.
                </p>
                <button className="clipped-button clipped-button-white text-sm px-6 hover:opacity-80 transition">
                  Ver Guias
                </button>
              </div>

              {/* Downloads */}
              <div className="bg-amm-orange bg-opacity-10 border-2 border-amm-orange rounded-lg p-8 hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-4">
                  <Download size={32} className="text-amm-orange" />
                  <h3 className="text-xl font-bold text-amm-orange">Downloads</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Baixe imagens, logos, modelos e outros recursos para usar em suas comunicações.
                </p>
                <button className="clipped-button clipped-button-white text-sm px-6 hover:opacity-80 transition">
                  Ver Downloads
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-amm-orange to-transparent p-8 rounded-lg text-center">
              <p className="text-2xl font-bold text-black uppercase">
                Precisa de algum material específico?
              </p>
              <p className="text-gray-900 mt-2">
                Entre em contato conosco através de nossas redes sociais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section id="sobre" className="min-h-screen bg-amm-dark text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Quem Somos</h1>
            <p className="text-lg text-gray-300">Conheça a história, missão e propósito do AMM Brasil MC</p>
          </div>
        </div>

        {/* Content */}
        <div className="py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Nossa História */}
            <div>
              <h2 className="text-3xl font-bold text-amm-orange mb-6 uppercase">Nossa História</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Com mais de uma década de história dedicada ao evangelismo e ao trabalho em apoio e parceria com ministérios e instituições da Igreja Adventista do Sétimo Dia, o AMM Brasil MC representa o motociclismo cristão da Igreja Adventista do Sétimo Dia no Brasil.
              </p>
              <div className="bg-amm-orange bg-opacity-10 border-l-4 border-amm-orange p-6 rounded">
                <p className="text-gray-100 font-semibold">
                  Fundado em 2013, o AMM Brasil MC já atua em 25 estados com mais de 158 regionais e quase 3.000 membros comprometidos em transformar vidas por meio do amor de Cristo.
                </p>
              </div>
            </div>

            {/* Nosso Propósito */}
            <div>
              <h2 className="text-3xl font-bold text-amm-orange mb-6 uppercase">Nosso Propósito</h2>
              <p className="text-gray-300 leading-relaxed">
                Compartilhar o amor de Cristo com motociclistas e entusiastas desta geração, promovendo valores cristãos e união através da paixão pelo motociclismo. Somos mais do que um moto clube – somos uma família unida pela fé e pela paixão pelas motos.
              </p>
            </div>

            {/* Nossa Missão */}
            <div>
              <h2 className="text-3xl font-bold text-amm-orange mb-6 uppercase">Nossa Missão</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Refletir o amor de Cristo no mundo biker através de diversas ações sociais e evangelísticas:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Arrecadação e distribuição de roupas, alimentos e medicamentos',
                  'Reformas e construção de lares para famílias carentes',
                  'Distribuição de livros missionários',
                  'Moto cultos e celebrações',
                  'Classes de estudo da Bíblia',
                  'Rede de discipulado e pastoreio',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-amm-orange text-xl mt-1">✦</span>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              {[
                { number: '2013', label: 'Fundação' },
                { number: '25', label: 'Estados' },
                { number: '158+', label: 'Regionais' },
                { number: '3.000', label: 'Membros' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl font-bold text-amm-orange mb-2">{stat.number}</p>
                  <p className="text-gray-400 uppercase text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div className="bg-gradient-to-r from-amm-orange to-transparent p-8 rounded-lg">
              <p className="text-2xl font-bold text-black uppercase">
                VENHA FAZER PARTE DE UMA FAMÍLIA UNIDA PELA FÉ E PELA PAIXÃO PELAS MOTOS!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Participar Section */}
      <section id="participar" className="min-h-screen bg-amm-dark text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Como Participar</h1>
            <p className="text-lg text-gray-300">Junte-se à nossa família de motociclistas cristãos</p>
          </div>
        </div>

        {/* Content */}
        <div className="py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <p className="text-gray-300 text-lg mb-12 text-center leading-relaxed">
              O AMM Brasil MC é aberto para motociclistas de todos os níveis que compartilham dos valores cristãos e desejam fazer parte de uma comunidade unida pela fé. Não é necessário ter experiência prévia em motociclismo, apenas vontade de aprender e crescer junto conosco.
            </p>

            {/* Steps */}
            <div className="space-y-8 mb-16">
              {[
                {
                  icon: <Users size={32} />,
                  title: 'Entre em Contato',
                  description: 'Procure uma regional AMM mais próximo da sua região e estabeleça contato através de nossas redes sociais.',
                },
                {
                  icon: <Heart size={32} />,
                  title: 'Conheça Nossa Comunidade',
                  description: 'Participe de nossos encontros, moto cultos e eventos para conhecer os membros e entender melhor nossa missão.',
                },
                {
                  icon: <CheckCircle size={32} />,
                  title: 'Cumpra os Requisitos',
                  description: 'Atenda aos critérios estabelecidos: fé cristã, respeito aos valores da comunidade e compromisso com as ações sociais.',
                },
                {
                  icon: <Zap size={32} />,
                  title: 'Torne-se um Membro',
                  description: 'Após aprovação, você será formalmente integrado à família AMM Brasil MC e receberá seu colete oficial.',
                },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-amm-orange bg-opacity-10 border-2 border-amm-orange rounded-full flex items-center justify-center text-amm-orange flex-col">
                    <span className="text-2xl font-bold">{idx + 1}</span>
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-xl font-bold text-amm-orange mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Requirements */}
            <div className="bg-amm-orange bg-opacity-10 border-2 border-amm-orange rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-amm-orange mb-6 uppercase">Requisitos</h3>
              <ul className="space-y-4">
                {[
                  'Ser maior de 18 anos e possuir CNH válida (categoria A)',
                  'Possuir motocicleta ou ciclomotor em bom estado de funcionamento',
                  'Compartilhar dos valores cristãos da Igreja Adventista do Sétimo Dia',
                  'Ter compromisso com as ações sociais e evangelísticas',
                  'Respeitar o código de conduta do motoclube',
                ].map((req, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-amm-orange flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Pronto para se juntar a nós?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Entre em contato conosco através de uma de nossas redes sociais ou envie um email com suas informações. Queremos conhecê-lo e ajudá-lo no seu caminho para se tornar parte da família AMM Brasil MC!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('contato')}
                  className="clipped-button clipped-button-orange text-base px-8 hover:opacity-80 transition"
                >
                  Contate-nos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="min-h-screen bg-amm-dark text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Contato</h1>
            <p className="text-lg text-gray-300">Fale conosco e faça parte da nossa comunidade</p>
          </div>
        </div>

        {/* Content */}
        <div className="py-16 px-8 md:px-16">
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
        </div>
      </section>
    </div>
  )
}
