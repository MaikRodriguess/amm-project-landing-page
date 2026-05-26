import { useState, useEffect, useRef } from 'react'
import { Music, Volume2, VolumeX } from 'lucide-react'

const MUSIC_URL = 'https://eotntvazmeylvvdbmbtw.supabase.co/storage/v1/object/public/video/EU%20SOU%20AMM-BRASIL.mp3'
const MUSIC_TITLE = 'Hino AMM Brasil'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showAutoTooltip, setShowAutoTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!audioRef.current) {
        console.warn('AudioRef não encontrado')
        return
      }

      const savedMutedState = localStorage.getItem('ammMusicMuted')
      const shouldBeMuted = savedMutedState !== 'false'

      console.log('Iniciando música...', { shouldBeMuted, url: MUSIC_URL })

      audioRef.current.muted = shouldBeMuted
      setIsMuted(shouldBeMuted)

      audioRef.current.play()
        .then(() => {
          console.log('Música tocando!')
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Erro ao tocar música:', error.message)
        })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutoTooltip(true)
      const hideTimer = setTimeout(() => {
        setShowAutoTooltip(false)
      }, 5000)
      return () => clearTimeout(hideTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleSound = async () => {
    setShowAutoTooltip(false)

    if (!audioRef.current) return

    const newMutedState = !isMuted
    audioRef.current.muted = newMutedState
    setIsMuted(newMutedState)
    localStorage.setItem('ammMusicMuted', String(!newMutedState))

    if (!isPlaying) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Erro ao tocar:', error)
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_URL}
        loop
        crossOrigin="anonymous"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.error('Erro ao carregar áudio:', e)}
      />

      <div className="fixed bottom-6 right-6 z-40 group">
        {/* Tooltip de Hover */}
        {showTooltip && !showAutoTooltip && (
          <div className="absolute bottom-16 right-0 bg-amm-dark text-amm-orange text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap border border-amm-orange/30">
            {isMuted ? '🔇 Clique para ativar som' : MUSIC_TITLE}
          </div>
        )}

        {/* Tooltip Automático */}
        {showAutoTooltip && (
          <div className="absolute bottom-16 right-0 bg-amm-orange text-black text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap border-2 border-amm-orange animate-pulse">
            🔇 Clique para ativar som!
          </div>
        )}

        {/* Botão Floatante */}
        <button
          onClick={toggleSound}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center border-2 ${
            !isMuted
              ? 'bg-amm-orange border-amm-orange text-black'
              : 'bg-amm-dark border-amm-orange/50 text-amm-orange hover:border-amm-orange'
          }`}
          title={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          {!isMuted ? (
            <Volume2 size={24} />
          ) : (
            <VolumeX size={24} />
          )}
        </button>

        {/* Indicador de status - nota pulsando quando tocando COM SOM */}
        {isPlaying && !isMuted && (
          <div className="absolute bottom-5 right-5 animate-pulse">
            <Music size={20} className="text-amm-orange" />
          </div>
        )}
      </div>
    </>
  )
}
