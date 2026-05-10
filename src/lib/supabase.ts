import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────

export interface EventExtra {
  event_id: string
  image: string
  description: string
  time: string
  address: string
  hidden?: boolean
  updated_at?: string
}

export interface CustomEvent {
  id: string
  month: string
  month_num: number
  date_range: string
  name: string
  location: string
  featured: boolean
  image: string
  description: string
  time_info: string
  address: string
  created_at?: string
}

// ─────────────────────────────────────────────
// EXTRAS (imagem, descrição, horário, endereço)
// ─────────────────────────────────────────────

export async function fetchAllEventExtras(): Promise<Record<string, EventExtra>> {
  const { data, error } = await supabase.from('events_extra').select('*')
  if (error) {
    console.error('[Supabase] fetchAllEventExtras error:', error.message)
    return {}
  }
  if (!data) return {}
  const map: Record<string, EventExtra> = {}
  for (const row of data) {
    map[row.event_id] = row
  }
  return map
}

export async function saveEventExtra(extra: EventExtra): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('events_extra')
    .upsert({ ...extra, updated_at: new Date().toISOString() }, { onConflict: 'event_id' })
  return { error: error?.message ?? null }
}

// ─────────────────────────────────────────────
// OCULTAR / RESTAURAR eventos da agenda fixa
// ─────────────────────────────────────────────

export async function fetchHiddenEventIds(): Promise<Set<string>> {
  const { data } = await supabase
    .from('events_extra')
    .select('event_id')
    .eq('hidden', true)
  return new Set((data ?? []).map((r: { event_id: string }) => r.event_id))
}

export async function setEventHidden(eventId: string, hidden: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('events_extra')
    .upsert(
      { event_id: eventId, image: '', description: '', time: '', address: '', hidden, updated_at: new Date().toISOString() },
      { onConflict: 'event_id' }
    )
  return !error
}

// ─────────────────────────────────────────────
// EVENTOS CUSTOMIZADOS (adicionados pelo admin)
// ─────────────────────────────────────────────

export async function fetchCustomEvents(): Promise<CustomEvent[]> {
  const { data, error } = await supabase
    .from('events_custom')
    .select('*')
    .order('month_num')
    .order('date_range')
  if (error) {
    console.error('[Supabase] fetchCustomEvents error:', error.message)
    return []
  }
  return data ?? []
}

export async function addCustomEvent(event: Omit<CustomEvent, 'id' | 'created_at'>): Promise<boolean> {
  const id = `custom-${Date.now()}`
  const { error } = await supabase.from('events_custom').insert({ id, ...event })
  if (error) console.error('[Supabase] addCustomEvent error:', error.message)
  return !error
}

export async function updateCustomEvent(id: string, updates: Partial<Omit<CustomEvent, 'id' | 'created_at'>>): Promise<boolean> {
  const { error } = await supabase.from('events_custom').update(updates).eq('id', id)
  if (error) console.error('[Supabase] updateCustomEvent error:', error.message)
  return !error
}

export async function deleteCustomEvent(id: string): Promise<boolean> {
  const { error } = await supabase.from('events_custom').delete().eq('id', id)
  if (error) console.error('[Supabase] deleteCustomEvent error:', error.message)
  return !error
}
