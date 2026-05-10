import { useState, useEffect } from 'react'
import { Save, LogOut, ChevronDown, ChevronUp, Eye, EyeOff, CheckCircle, AlertCircle, Loader, Plus, Trash2, EyeOff as Hide, RotateCcw, X } from 'lucide-react'
import { AGENDA_2026, type EventItem } from '../components/EventsSection'
import {
  fetchAllEventExtras, saveEventExtra, type EventExtra,
  fetchHiddenEventIds, setEventHidden,
  fetchCustomEvents, addCustomEvent, updateCustomEvent, deleteCustomEvent, type CustomEvent,
} from '../lib/supabase'

const ADMIN_PASSWORD = 'AMMsenha'

const MONTHS = [
  { label: 'Janeiro', num: 1 }, { label: 'Fevereiro', num: 2 }, { label: 'Março', num: 3 },
  { label: 'Abril', num: 4 }, { label: 'Maio', num: 5 }, { label: 'Junho', num: 6 },
  { label: 'Julho', num: 7 }, { label: 'Agosto', num: 8 }, { label: 'Setembro', num: 9 },
  { label: 'Outubro', num: 10 }, { label: 'Novembro', num: 11 }, { label: 'Dezembro', num: 12 },
]

function makeEventId(monthNum: number, date: string): string {
  return `${String(monthNum).padStart(2, '0')}-${date.replace(/\s/g, '')}`
}

// ─── LOGIN ───────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) { sessionStorage.setItem('amm_admin', '1'); onLogin() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="https://i0.wp.com/amm-brasil.siteoficial.org.br/wp-content/uploads/2024/12/Logo-AMM-Brasil-ofcial-Branca-3.png?w=60&ssl=1" alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold uppercase">Painel Admin</h1>
          <p className="text-gray-500 text-sm mt-1">AMM Brasil MC — Rondônia</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Senha</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 pr-10"
                placeholder="Digite a senha..." autoFocus />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> Senha incorreta</p>}
          </div>
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-lg transition text-sm uppercase">Entrar</button>
        </form>
        <p className="text-center text-gray-700 text-xs mt-4">Acesso restrito — AMM Brasil MC</p>
      </div>
    </div>
  )
}

// ─── FIELD (fora de qualquer componente para evitar re-criação) ──────────────
const inputBase = 'w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500 resize-none'

function FormField({ label, value, onChange, placeholder, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; multiline?: boolean
}) {
  return (
    <div>
      <label className="text-gray-400 text-xs mb-1 block">{label}</label>
      {multiline
        ? <textarea rows={2} className={inputBase} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
        : <input type="text" className={inputBase} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />}
    </div>
  )
}

// ─── MODAL ADICIONAR EVENTO ───────────────────
function AddEventModal({ onClose, onAdd }: { onClose: () => void; onAdd: (ev: Omit<CustomEvent, 'id' | 'created_at'>) => Promise<void> }) {
  const [form, setForm] = useState({ month: 'Janeiro', month_num: 1, date_range: '', name: '', location: '', featured: false, image: '', description: '', time_info: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.date_range.trim() || !form.location.trim()) { setError('Preencha nome, data e local.'); return }
    setSaving(true)
    await onAdd(form)
    setSaving(false)
    onClose()
  }


  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1a1a] border border-amber-500/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg uppercase">Adicionar Evento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Mês</label>
              <select value={form.month} onChange={e => { const m = MONTHS.find(x => x.label === e.target.value)!; setForm(f => ({ ...f, month: m.label, month_num: m.num })) }}
                className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500">
                {MONTHS.map(m => <option key={m.num} value={m.label}>{m.label}</option>)}
              </select>
            </div>
            <FormField label="Data (ex: 15 a 17)" value={form.date_range} onChange={v => setForm(f => ({ ...f, date_range: v }))} placeholder="01 a 03" />
          </div>

          <FormField label="Nome do Evento *" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Nome completo do evento" />
          <FormField label="Local *" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="Cidade/UF" />
          <FormField label="🖼️ URL do Flyer" value={form.image} onChange={v => setForm(f => ({ ...f, image: v }))} placeholder="https://..." />
          <FormField label="📝 Descrição" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Detalhes do evento..." multiline />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="🕐 Horário" value={form.time_info} onChange={v => setForm(f => ({ ...f, time_info: v }))} placeholder="A partir das 08h" />
            <FormField label="📍 Endereço" value={form.address} onChange={v => setForm(f => ({ ...f, address: v }))} placeholder="Endereço completo" />
          </div>

          <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="accent-amber-500" />
            ⭐ Evento em destaque
          </label>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-bold py-2.5 rounded-lg transition text-sm">
              {saving ? <Loader size={15} className="animate-spin" /> : <Plus size={15} />}
              {saving ? 'Salvando...' : 'Adicionar Evento'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 border border-white/10 text-gray-400 hover:text-white rounded-lg text-sm transition">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── EDITOR DE EVENTO ─────────────────────────
function EventEditor({ event, monthNum, month, extra, onSave, onHide, onDelete, onSaveCustom, isHidden, isCustom, customId }:
  { event: EventItem; monthNum: number; month: string; extra: EventExtra | undefined; onSave: (id: string, d: EventExtra) => Promise<boolean>; onHide?: () => Promise<void>; onDelete?: () => Promise<void>; onSaveCustom?: (id: string, updates: Partial<CustomEvent>) => Promise<boolean>; isHidden?: boolean; isCustom?: boolean; customId?: string }) {
  const eventId = makeEventId(monthNum, event.date)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [actionLoading, setActionLoading] = useState(false)
  const [form, setForm] = useState({ image: extra?.image ?? '', description: extra?.description ?? '', time: extra?.time ?? '', address: extra?.address ?? '' })

  useEffect(() => { setForm({ image: extra?.image ?? '', description: extra?.description ?? '', time: extra?.time ?? '', address: extra?.address ?? '' }) }, [extra])

  async function handleSave() {
    setSaving(true)
    const ok = isCustom && onSaveCustom && customId
      ? await onSaveCustom(customId, { ...form } as any)
      : await onSave(eventId, { event_id: eventId, ...form })
    setSaving(false)
    setStatus(ok ? 'ok' : 'err')
    setTimeout(() => setStatus('idle'), 3000)
  }

  async function handleAction(fn: () => Promise<void>) {
    setActionLoading(true)
    await fn()
    setActionLoading(false)
  }

  const hasData = Boolean(extra?.image || extra?.description || extra?.time || extra?.address)

  return (
    <div className={`border rounded-xl overflow-hidden transition-opacity ${isHidden ? 'opacity-40 border-white/5' : 'border-white/10'}`}>
      <div className="flex items-center">
        <button onClick={() => setOpen(v => !v)} className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-white/5 transition text-left">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${isCustom ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-amber-500/10 text-amber-500'}`}>
                {isCustom ? '✨ Custom' : ''}{month} · {event.date}
              </span>
              {hasData && !isHidden && <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle size={10} /> Preenchido</span>}
              {isHidden && <span className="text-gray-600 text-xs">Oculto</span>}
            </div>
            <p className="text-white font-semibold text-sm mt-1">{event.name}</p>
            <p className="text-gray-500 text-xs">{event.location}</p>
          </div>
          {open ? <ChevronUp size={16} className="text-gray-500 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />}
        </button>

        {/* Botão Ocultar/Restaurar ou Remover */}
        <div className="pr-3">
          {isCustom && onDelete && (
            <button onClick={() => handleAction(onDelete)} disabled={actionLoading} title="Remover evento"
              className="text-red-500 hover:text-red-400 disabled:opacity-40 p-2 transition">
              {actionLoading ? <Loader size={15} className="animate-spin" /> : <Trash2 size={15} />}
            </button>
          )}
          {!isCustom && onHide && (
            <button onClick={() => handleAction(onHide)} disabled={actionLoading} title={isHidden ? 'Restaurar evento' : 'Ocultar evento'}
              className={`disabled:opacity-40 p-2 transition ${isHidden ? 'text-green-400 hover:text-green-300' : 'text-gray-500 hover:text-red-400'}`}>
              {actionLoading ? <Loader size={15} className="animate-spin" /> : isHidden ? <RotateCcw size={15} /> : <Hide size={15} />}
            </button>
          )}
        </div>
      </div>

      {open && !isHidden && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3 space-y-3">
          {form.image && <img src={form.image} alt="Preview" className="w-full max-h-40 object-contain rounded-lg border border-white/10 bg-black" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />}
          {[
            { label: '🖼️ URL do Flyer', key: 'image', ph: 'https://...' },
            { label: '📝 Descrição', key: 'description', ph: 'Descreva o evento...' },
            { label: '🕐 Horário', key: 'time', ph: 'A partir das 08h' },
            { label: '📍 Endereço', key: 'address', ph: 'Endereço completo' },
          ].map(({ label, key, ph }) => (
            <div key={key}>
              <label className="text-gray-400 text-xs mb-1 block">{label}</label>
              <input type="text" className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                placeholder={ph} value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
            </div>
          ))}
          <div className="flex items-center gap-3">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-bold px-4 py-2 rounded-lg text-sm transition">
              {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
            {status === 'ok' && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle size={13} /> Salvo!</span>}
            {status === 'err' && <span className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={13} /> Erro ao salvar</span>}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PAINEL PRINCIPAL ─────────────────────────
function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [extras, setExtras] = useState<Record<string, EventExtra>>({})
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [showPast, setShowPast] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const currentMonth = new Date().getMonth() + 1

  useEffect(() => {
    Promise.all([fetchAllEventExtras(), fetchHiddenEventIds(), fetchCustomEvents()])
      .then(([ex, hidden, custom]) => { setExtras(ex); setHiddenIds(hidden); setCustomEvents(custom); setLoading(false) })
      .catch(() => { setLoadError(true); setLoading(false) })
  }, [])

  async function handleSave(id: string, data: EventExtra): Promise<boolean> {
    const { error } = await saveEventExtra(data)
    if (!error) { setExtras(prev => ({ ...prev, [id]: data })); return true }
    return false
  }

  async function handleHide(eventId: string, currentlyHidden: boolean) {
    const ok = await setEventHidden(eventId, !currentlyHidden)
    if (ok) setHiddenIds(prev => { const s = new Set(prev); currentlyHidden ? s.delete(eventId) : s.add(eventId); return s })
  }

  async function handleAdd(ev: Omit<CustomEvent, 'id' | 'created_at'>) {
    const ok = await addCustomEvent(ev)
    if (ok) { const updated = await fetchCustomEvents(); setCustomEvents(updated) }
  }

  async function handleSaveCustom(id: string, updates: Partial<CustomEvent>): Promise<boolean> {
    const ok = await updateCustomEvent(id, updates)
    if (ok) { const updated = await fetchCustomEvents(); setCustomEvents(updated) }
    return ok
  }

  async function handleDelete(id: string) {
    const ok = await deleteCustomEvent(id)
    if (ok) setCustomEvents(prev => prev.filter(e => e.id !== id))
  }

  const monthsWithEvents = AGENDA_2026.filter(m => m.events.length > 0)

  // Junta hardcoded + custom por mês
  function getCustomForMonth(monthNum: number) {
    return customEvents.filter(ce => ce.month_num === monthNum)
  }
  const customOnlyMonths = customEvents
    .map(ce => ce.month_num)
    .filter(mn => !AGENDA_2026.some(m => m.monthNum === mn && m.events.length > 0))
    .filter((v, i, a) => a.indexOf(v) === i)

  return (
    <>
      <div className="min-h-screen bg-[#0e0e0e] text-white">
        <div className="sticky top-0 z-10 bg-[#0e0e0e]/95 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i0.wp.com/amm-brasil.siteoficial.org.br/wp-content/uploads/2024/12/Logo-AMM-Brasil-ofcial-Branca-3.png?w=60&ssl=1" alt="Logo" className="h-9" />
            <div>
              <p className="text-white font-bold text-sm uppercase leading-tight">Painel Admin</p>
              <p className="text-amber-500 text-xs">AMM Brasil MC · Rondônia</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-4 py-2 rounded-lg text-sm transition">
              <Plus size={15} /> Adicionar Evento
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition">
              <LogOut size={15} /> Sair
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold uppercase">Eventos 2026</h2>
            <p className="text-gray-500 text-sm mt-1">
              Edite detalhes, oculte (<Hide size={13} className="inline" />) ou adicione eventos.
              Clique em qualquer evento para expandir.
            </p>
          </div>

          {loading && <div className="flex items-center justify-center py-20 text-gray-500"><Loader size={20} className="animate-spin mr-2" /> Carregando...</div>}
          {loadError && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center">
              <AlertCircle size={24} className="text-red-400 mx-auto mb-2" />
              <p className="text-red-400 font-semibold">Erro ao conectar com o Supabase</p>
              <p className="text-gray-500 text-sm mt-1">Verifique <code className="text-amber-400">VITE_SUPABASE_ANON_KEY</code> no <code className="text-amber-400">.env</code> e se a tabela existe.</p>
            </div>
          )}

          {!loading && !loadError && (
            <div className="space-y-10">
              <button onClick={() => setShowPast(v => !v)} className="text-gray-600 hover:text-gray-400 text-xs underline transition">
                {showPast ? 'Ocultar meses passados' : 'Mostrar meses passados'}
              </button>

              {[...monthsWithEvents, ...customOnlyMonths.map(mn => ({ monthNum: mn, month: MONTHS.find(m => m.num === mn)?.label ?? '', events: [] as EventItem[] }))].map(monthData => {
                const isPast = monthData.monthNum < currentMonth
                const isCurrent = monthData.monthNum === currentMonth
                if (isPast && !showPast) return null
                const customs = getCustomForMonth(monthData.monthNum)
                const totalEvents = monthData.events.length + customs.length
                if (totalEvents === 0 && !isCurrent) return null

                return (
                  <div key={monthData.monthNum} id={`month-${monthData.monthNum}`}>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 flex-wrap">
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${isCurrent ? 'bg-green-500/20 border-green-400 text-green-400' : isPast ? 'bg-white/5 border-white/20 text-gray-600' : 'bg-amber-500/10 border-amber-500 text-amber-500'}`}>
                        {String(monthData.monthNum).padStart(2, '0')}
                      </span>
                      <span className={isCurrent ? 'text-green-400' : isPast ? 'text-gray-600' : 'text-amber-500'}>{monthData.month}</span>
                      {isCurrent && <span className="bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Mês atual</span>}
                      {isPast && <span className="text-gray-700 text-[10px] uppercase">passado</span>}
                    </h3>

                    <div className="space-y-2">
                      {/* Eventos fixos */}
                      {monthData.events.map((ev, i) => {
                        const eventId = makeEventId(monthData.monthNum, ev.date)
                        return (
                          <EventEditor key={i} event={ev} monthNum={monthData.monthNum} month={monthData.month}
                            extra={extras[eventId]} onSave={handleSave}
                            isHidden={hiddenIds.has(eventId)}
                            onHide={() => handleHide(eventId, hiddenIds.has(eventId))} />
                        )
                      })}
                      {/* Eventos customizados */}
                      {customs.map(ce => {
                        const ev: EventItem = { date: ce.date_range, name: ce.name, location: ce.location, featured: ce.featured, image: ce.image, description: ce.description, time: ce.time_info, address: ce.address }
                        return (
                          <EventEditor key={ce.id} event={ev} monthNum={ce.month_num} month={ce.month}
                            extra={extras[ce.id]} onSave={handleSave} onSaveCustom={handleSaveCustom}
                            isCustom customId={ce.id} onDelete={() => handleDelete(ce.id)} />
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {showAddModal && <AddEventModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
    </>
  )
}

// ─── PÁGINA PRINCIPAL ─────────────────────────
export default function Admin() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('amm_admin') === '1')
  return auth
    ? <AdminPanel onLogout={() => { sessionStorage.removeItem('amm_admin'); setAuth(false) }} />
    : <LoginScreen onLogin={() => setAuth(true)} />
}
