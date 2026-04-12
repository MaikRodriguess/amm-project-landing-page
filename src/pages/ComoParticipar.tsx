import ClippedButton from '../components/ClippedButton'
import { CheckCircle, Users, Heart, Zap } from 'lucide-react'

export default function ComoParticipar() {
  return (
    <div className="min-h-screen bg-amm-dark text-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-amm-orange to-amm-dark py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Como Participar</h1>
          <p className="text-lg text-gray-300">Junte-se à nossa família de motociclistas cristãos</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-8 md:px-16">
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
              <ClippedButton variant="orange" className="text-base px-8">
                <a href="https://www.instagram.com/ministerio.amm.brasil.mc/" target="_blank" rel="noopener noreferrer">
                  Contate-nos no Instagram
                </a>
              </ClippedButton>
              <ClippedButton variant="white" className="text-base px-8">
                <a href="mailto:contato@amm-brasil.org">
                  Envie um Email
                </a>
              </ClippedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
