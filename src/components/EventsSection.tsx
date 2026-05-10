import { useState, useEffect } from 'react'
import { MapPin, Calendar, ChevronDown, ChevronUp, X, Clock, Info } from 'lucide-react'
import { fetchCustomEvents, type CustomEvent } from '../lib/supabase'

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
export interface EventItem {
  date: string
  name: string
  location: string
  featured?: boolean
  // Campos opcionais para o card de destaque / modal
  image?: string        // URL do flyer/arte do evento
  description?: string  // Descrição detalhada
  time?: string         // Ex: "A partir das 08h"
  address?: string      // Endereço mais detalhado
}

export interface MonthEvents {
  month: string
  monthNum: number
  events: EventItem[]
}

// ─────────────────────────────────────────────
// DADOS — Apenas estrutura de meses vazia
// Todos os eventos vêm do Supabase (customizados)
// ─────────────────────────────────────────────
export const AGENDA_2026: MonthEvents[] = [
  { month: 'Janeiro', monthNum: 1, events: [] },
  { month: 'Fevereiro', monthNum: 2, events: [] },
  { month: 'Março', monthNum: 3, events: [] },
  { month: 'Abril', monthNum: 4, events: [] },
  { month: 'Maio', monthNum: 5, events: [] },
  { month: 'Junho', monthNum: 6, events: [] },
  { month: 'Julho', monthNum: 7, events: [] },
  { month: 'Agosto', monthNum: 8, events: [] },
  { month: 'Setembro', monthNum: 9, events: [] },
  { month: 'Outubro', monthNum: 10, events: [] },
  { month: 'Novembro', monthNum: 11, events: [] },
  { month: 'Dezembro', monthNum: 12, events: [] },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function getUpcomingEvents(agenda: MonthEvents[] = AGENDA_2026): (EventItem & { month: string })[] {
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const upcoming: (EventItem & { month: string })[] = []
  for (const monthData of agenda) {
    for (const ev of monthData.events) {
      const firstDay = parseInt(ev.date.split(/[ a/]/)[0], 10)
      if (monthData.monthNum > currentMonth || (monthData.monthNum === currentMonth && firstDay >= currentDay)) {
        upcoming.push({ ...ev, month: monthData.month })
      }
    }
  }
  return upcoming
}

// ─────────────────────────────────────────────
// MODAL DE DETALHES
// ─────────────────────────────────────────────
function EventModal({
  event,
  onClose,
}: {
  event: (EventItem & { month: string }) | null
  onClose: () => void
}) {
  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#1e1e1e] border border-amm-orange/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem do evento */}
        {event.image ? (
          <img
            src={event.image}
            alt={event.name}
            className="w-full max-h-96 object-contain bg-black"
          />
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-amm-orange/20 to-amm-dark flex items-center justify-center">
            <span className="text-6xl">🏍️</span>
          </div>
        )}

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white rounded-full p-1.5 transition"
        >
          <X size={18} />
        </button>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Badge */}
          <span className="inline-block bg-amm-orange text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
            {event.month} · {event.date}
          </span>

          <h3 className="text-xl font-bold text-white mb-4 leading-snug">{event.name}</h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <MapPin size={15} className="text-amm-orange flex-shrink-0" />
              <span>{event.address || event.location}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Clock size={15} className="text-amm-orange flex-shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
          </div>

          {event.description ? (
            <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
              {event.description}
            </p>
          ) : (
            <p className="text-gray-600 text-sm italic border-t border-white/10 pt-4 flex items-center gap-2">
              <Info size={14} /> Mais informações em breve.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// CARD DE EVENTO EM DESTAQUE (o mais próximo)
// ─────────────────────────────────────────────
function FeaturedEventCard({
  event,
  onDetails,
}: {
  event: EventItem & { month: string }
  onDetails: () => void
}) {
  const hasImage = Boolean(event.image)

  return (
    <div className="rounded-2xl overflow-hidden border border-amm-orange/40 bg-gradient-to-br from-[#1e1e1e] to-amm-dark shadow-xl shadow-amm-orange/5 mb-10">
      <div className={`flex flex-col ${hasImage ? 'md:flex-row' : ''}`}>

        {/* Imagem (topo no mobile, lado esquerdo no desktop) */}
        {hasImage && (
          <div className="md:w-2/5 flex-shrink-0 bg-black">
            <img
              src={event.image}
              alt={event.name}
              className="w-full max-h-[420px] md:h-full object-contain md:object-cover"
            />
          </div>
        )}

        {/* Informações */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              🏍️ Próximo Evento
            </span>
            {event.featured && (
              <span className="bg-amm-orange text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                Destaque
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-amm-orange font-bold text-lg mb-2">
            <Calendar size={18} />
            <span>{event.month} · {event.date}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
            {event.name}
          </h3>

          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>

          {event.time && (
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
              <Clock size={14} />
              <span>{event.time}</span>
            </div>
          )}

          {event.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
              {event.description}
            </p>
          )}

          <div className="mt-auto pt-2">
            <button
              onClick={onDetails}
              className="clipped-button clipped-button-orange text-sm px-6 hover:opacity-80 transition"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export function EventsSection() {
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([])

  const loadEvents = async () => {
    try {
      const custom = await fetchCustomEvents()
      setCustomEvents(custom)
    } catch (err) {
      console.error('[EventsSection] Erro ao carregar:', err)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  // Agenda dinâmica: apenas eventos customizados (do Supabase)
  const dynamicAgenda = AGENDA_2026.map(monthData => ({
    ...monthData,
    events: customEvents.filter(ce => ce.month_num === monthData.monthNum).map(ce => ({
      date: ce.date_range, name: ce.name, location: ce.location, featured: ce.featured,
      image: ce.image, description: ce.description, time: ce.time_info, address: ce.address,
    } as EventItem)),
  }))

  const allUpcoming = getUpcomingEvents(dynamicAgenda)

  const featuredEvent = allUpcoming[0] ?? null
  const nextThree = allUpcoming.slice(1, 4)

  const [showFull, setShowFull] = useState(false)
  const [modalEvent, setModalEvent] = useState<(EventItem & { month: string }) | null>(null)

  return (
    <section id="eventos" className="bg-amm-dark text-white">

      {/* ── CABEÇALHO + EVENTO EM DESTAQUE ── */}
      <div className="bg-gradient-to-b from-black to-amm-dark pt-14 pb-10 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">

          {/* Título da seção */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🏍️</span>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">Próximos Eventos</h2>
              <p className="text-amm-orange text-sm font-semibold tracking-widest uppercase">
                Rondônia e Adjacências — 2026
              </p>
            </div>
          </div>

          {/* Card grande do próximo evento */}
          {featuredEvent && (
            <FeaturedEventCard
              event={featuredEvent}
              onDetails={() => setModalEvent(featuredEvent)}
            />
          )}

          {/* Cards menores — próximos 3 */}
          {nextThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextThree.map((ev, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl p-5 border transition-transform hover:-translate-y-1 duration-300 cursor-pointer ${
                    ev.featured
                      ? 'border-amm-orange bg-gradient-to-br from-amm-orange/20 to-amm-dark shadow-lg shadow-amm-orange/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setModalEvent(ev)}
                >
                  {ev.featured && (
                    <span className="absolute top-3 right-3 bg-amm-orange text-black text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                      Destaque
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-amm-orange font-bold text-base mb-1">
                    <Calendar size={14} />
                    <span>{ev.month} · {ev.date}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2">{ev.name}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin size={12} />
                    <span>{ev.location}</span>
                  </div>
                  <span className="text-amm-orange text-xs font-semibold underline underline-offset-2">
                    Ver detalhes →
                  </span>
                </div>
              ))}
            </div>
          )}

          {allUpcoming.length === 0 && (
            <p className="text-gray-400">Nenhum evento próximo encontrado.</p>
          )}

          {/* Ver agenda completa */}
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

      {/* ── AGENDA COMPLETA ── */}
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
            {dynamicAgenda.map((monthData) => {
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

                  {monthData.events.length === 0 ? (
                    <p className="text-gray-600 text-sm italic">Nenhum evento cadastrado</p>
                  ) : (
                    <ul className="space-y-3">
                      {monthData.events.map((ev, i) => (
                        <li
                          key={i}
                          className={`flex gap-3 items-start p-3 rounded-lg cursor-pointer transition-colors ${
                            ev.featured
                              ? 'bg-amm-orange/10 border border-amm-orange/40 hover:bg-amm-orange/20'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => setModalEvent({ ...ev, month: monthData.month })}
                        >
                          <div className="flex-shrink-0 text-center min-w-[48px]">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${ev.featured ? 'bg-amm-orange text-black' : 'bg-white/10 text-amm-orange'}`}>
                              {ev.date}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold leading-snug ${ev.featured ? 'text-amm-orange' : 'text-white'}`}>
                              {ev.featured && '⭐ '}{ev.name}
                            </p>
                            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                              <MapPin size={11} />
                              <span>{ev.location}</span>
                            </div>
                          </div>
                          <span className="text-gray-600 text-xs self-center flex-shrink-0">→</span>
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

      {/* ── MODAL ── */}
      <EventModal
        event={modalEvent}
        onClose={() => setModalEvent(null)}
      />
    </section>
  )
}
