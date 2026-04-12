export default function SobreNos() {
  return (
    <div className="min-h-screen bg-amm-dark text-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Quem Somos</h1>
          <p className="text-lg text-gray-300">Conheça a história, missão e propósito do AMM Brasil MC</p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-8 md:px-16">
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

          {/* Tagline */}
          <div className="bg-gradient-to-r from-amm-orange to-transparent p-8 rounded-lg">
            <p className="text-2xl font-bold text-black uppercase">
              VENHA FAZER PARTE DE UMA FAMÍLIA UNIDA PELA FÉ E PELA PAIXÃO PELAS MOTOS!
            </p>
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

          {/* Disclaimer */}
          <div className="bg-blue-900 bg-opacity-30 border-2 border-blue-500 border-opacity-40 p-6 rounded-lg mt-12">
            <p className="text-blue-300 text-sm leading-relaxed">
              <span className="font-bold">ℹ️ Informação Importante:</span> Esta é uma página informativa criada por um membro da comunidade AMM Brasil MC com o objetivo de compartilhar informações sobre o motoclube. Não é uma página oficial do AMM Brasil MC. Para informações oficiais, políticas e atualizações autorizadas, visite o{' '}
              <a
                href="https://amm-brasil.siteoficial.org.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amm-orange font-bold hover:underline"
              >
                site oficial do AMM Brasil MC
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
