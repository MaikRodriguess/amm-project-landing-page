import { useBackgroundMusic } from '../hooks/useBackgroundMusic'

interface BackgroundMusicProps {
  src: string
  volume?: number
  loop?: boolean
}

export function BackgroundMusic({ src, volume = 0.3, loop = true }: BackgroundMusicProps) {
  useBackgroundMusic({
    src,
    autoplay: true,
    loop,
    volume,
  })

  return null
}
