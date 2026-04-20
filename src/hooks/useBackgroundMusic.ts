import { useEffect, useRef } from 'react'

interface UseBackgroundMusicOptions {
  src: string
  autoplay?: boolean
  loop?: boolean
  volume?: number
}

export function useBackgroundMusic({
  src,
  autoplay = true,
  loop = true,
  volume = 0.3,
}: UseBackgroundMusicOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = loop
    audio.volume = volume
    audioRef.current = audio

    if (autoplay) {
      audio.play().catch((err) => {
        console.log('Autoplay bloqueado pelo navegador:', err)
      })
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [src, autoplay, loop, volume])

  return {
    play: () => audioRef.current?.play(),
    pause: () => audioRef.current?.pause(),
    setVolume: (vol: number) => {
      if (audioRef.current) audioRef.current.volume = vol
    },
  }
}
