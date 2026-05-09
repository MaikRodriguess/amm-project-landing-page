import { useState } from 'react'
import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

export interface EventItem {
  date: string
  name: string
  location: string
  featured?: boolean // 🔶 grande destaque
}

export interface MonthEvents {
  month: string
  monthNum: number
  events: EventItem[]
}

export const AGENDA_2026: MonthEvents[] = [
  {
    month: 'Janeiro', monthNum: 1,
    events: [
      { date: '31', name: '1° Aniversário Alvissareiros MCA', location: 'Presidente Médice/RO' },
    ],
  },
  {
    month: 'Fevereiro', monthNum: 2,
    events: [
      { date: '07', name: '7° Aniversário Jabutis do Acre', location: 'Rio Branco/AC' },
    ],
  },
  {
    month: 'Março', monthNum: 3,
    events: [
      { date: '14', name: '17° Aniversário do Point do Motociclista', location: 'Porto Velho/RO' },
    ],
  },
  {
    month: 'Abril', monthNum: 4,
    events: [
      { date: '10 a 12', name: 'Arcanjos Motofest 2026', location: 'Cacoal/RO' },
    ],
  },
  {
    month: 'Maio', monthNum: 5,
    events: [
      { date: '01 a 03', name: '3° Aniversário do Ferrovia MC', location: 'Guajará-Mirim/RO' },
    ],
  },
  {
    month: 'Junho', monthNum: 6,
    events: [
      { date: '05 a 07', name: '1º Encontro Doidos por Estrada Brasil', location: 'Jaru/RO' },
    ],
  },
  {
    month: 'Julho', monthNum: 7,
    events: [
      { date: '04', name: '10° Aniversário do Porto Velho MG', location: 'Porto Velho/RO', featured: true },
      { date: '11', name: '2° Aniversário Black Stone', location: 'Humaitá/AM' },
      { date: '24 a 26', name: "Aniversário dos Rider's do Norte", location: 'Jaru/RO', featured: true },
      { date: '25', name: 'Niver Regional Águias de Cristo', location: 'Manaus/AM' },
    ],
  },
  {
    month: 'Agosto', monthNum: 8,
    events: [
      { date: '07 a 09', name: '2° Acre Moto Road', location: 'Rio Branco/AC', featured: true },
      { date: '15 e 16', name: 'Trubian Day 2026', location: 'Ouro Preto do Oeste/RO' },
      { date: '28 a 30', name: 'Piratas da Amazônia', location: 'Machadinho D\'Oeste/RO' },
    ],
  },
  {
    month: 'Setembro', monthNum: 9,
    events: [
      { date: '04 a 06', name: '16° Madeira Road e 26° Aniversário do Viramundo MG', location: 'Rondônia' },
      { date: '19', name: '10° Aniversário do Claveiras Brasil Motoclube', location: 'Porto Velho/RO' },
    ],
  },
  {
    month: 'Outubro', monthNum: 10,
    events: [
      { date: '30/10 a 01/11', name: '8° Aniversário do Águias da Amazônia', location: 'Vilhena/RO' },
    ],
  },
  {
    month: 'Novembro', monthNum: 11,
    events: [],
  },
  {
    month: 'Dezembro', monthNum: 12,
    events: [],
  },
]

// Retorna eventos futuros a partir de hoje
function getUpcomingEvents(): (EventItem & { month: string })[] {
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const upcoming: (EventItem & { month: string })[] = []

  for (const monthData of AGENDA_2026) {
    for (const ev of monthData.events) {
      const firstDay = parseInt(ev.date.split(/[ a/]/)[0], 10)
      if (
        monthData.monthNum > currentMonth ||
        (monthData.monthNum === currentMonth && firstDay >= currentDay)
      ) {
        upcoming.push({ ...ev, month: monthData.month })
      }
    }
  }
  return upcoming
}

export function EventsSection() {
  const upcoming = getUpcomingEvents().slice(0, 3)
  const [showFull, setShowFull] = useState(false)

  return (
    <section id="eventos" className="bg-amm-dark text-white">

      {/* ── PRÓXIMOS EVENTOS (destaque) ── */}
      <div className="bg-gradient-to-b from-black to-amm-dark pt-14 pb-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🏍️</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">Próximos Eventos</h2>
              <p className="text-amm-orange text-sm font-semibold tracking-widest uppercase">Rondônia e Adjacências — 2026</p>
            </div>
          </div>

          {upcoming.length === 0 ? (
            <p className="text-gray-400">Nenhum evento próximo encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcoming.map((ev, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl p-5 border transition-transform hover:-translate-y-1 duration-300 ${
                    ev.featured
                      ? 'border-amm-orange bg-gradient-to-br from-amm-orange/20 to-amm-dark shadow-lg shadow-amm-orange/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  {ev.featured && (
                    <span className="absolute top-3 right-3 bg-amm-orange text-black text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Destaque
                    </span>
                  )}
                  {i === 0 && (
                    <span className="absolute top-3 left-3 bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Próximo
                    </span>
                  )}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-amm-orange font-bold text-lg mb-1">
                      <Calendar size={16} />
                      <span>{ev.month} · {ev.date}</span>
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug mb-2">{ev.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MapPin size={13} />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ver agenda completa */}
          <div className="mt-6 text-center md:text-right">
            <button
              onClick={() => setShowFull(v => !v)}
              className="inline-flex items-center gap-1 text-amm-orange text-sm font-semibold hover:underline transition"
            >
              {showFull ? 'Ocultar agenda completa' : 'Ver agenda completa'}
              {showFull ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── AGENDA COMPLETA (timeline por mês) ── */}
      <div
        id="agenda-completa"
        className={`overflow-hidden transition-all duration-500 ease-in-out border-t border-white/5 ${
          showFull ? 'max-h-[9999px] opacity-100 py-16 px-6 md:px-16' : 'max-h-0 opacity-0 py-0 px-6 md:px-16'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase text-amm-orange mb-2">
              Agenda Completa 2026
            </h2>
            <p className="text-gray-400 text-base">Eventos Motociclísticos · Rondônia e Adjacências</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AGENDA_2026.map((monthData) => {
              const isPast = monthData.monthNum < new Date().getMonth() + 1
              return (
                <div
                  key={monthData.monthNum}
                  className={`rounded-xl border p-6 transition-all duration-200 ${
                    monthData.events.length === 0
                      ? 'border-white/5 opacity-40'
                      : isPast
                      ? 'border-white/10 opacity-60'
                      : 'border-amm-orange/30 bg-amm-orange/5 hover:bg-amm-orange/10'
                  }`}
                >
                  {/* Cabeçalho do mês */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-amm-orange/20 border border-amm-orange flex items-center justify-center text-amm-orange font-bold text-sm flex-shrink-0">
                      {String(monthData.monthNum).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold uppercase tracking-wide ${isPast ? 'text-gray-500' : 'text-white'}`}>
                        {monthData.month}
                      </h3>
                      {isPast && <span className="text-xs text-gray-600 uppercase">Encerrado</span>}
                    </div>
                  </div>

                  {/* Lista de eventos do mês */}
                  {monthData.events.length === 0 ? (
                    <p className="text-gray-600 text-sm italic">Nenhum evento cadastrado</p>
                  ) : (
                    <ul className="space-y-3">
                      {monthData.events.map((ev, i) => (
                        <li
                          key={i}
                          className={`flex gap-3 items-start p-3 rounded-lg ${
                            ev.featured
                              ? 'bg-amm-orange/10 border border-amm-orange/40'
                              : 'bg-white/5'
                          }`}
                        >
                          {/* Badge de data */}
                          <div className="flex-shrink-0 text-center min-w-[48px]">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${ev.featured ? 'bg-amm-orange text-black' : 'bg-white/10 text-amm-orange'}`}>
                              {ev.date}
                            </span>
                          </div>
                          {/* Info */}
                          <div className="flex-1">
                            <p className={`text-sm font-semibold leading-snug ${ev.featured ? 'text-amm-orange' : 'text-white'}`}>
                              {ev.featured && '⭐ '}{ev.name}
                            </p>
                            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                              <MapPin size={11} />
                              <span>{ev.location}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
