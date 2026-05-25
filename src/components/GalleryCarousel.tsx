import { useState, useEffect, useMemo } from 'react'
import { fetchCarouselPhotos, type GalleryPhoto } from '../lib/supabase'

export default function GalleryCarousel() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [loading, setLoading] = useState(true)

  const randomizedPhotos = useMemo(
    () => [...photos].sort(() => Math.random() - 0.5),
    [photos]
  )

  useEffect(() => {
    fetchCarouselPhotos()
      .then(setPhotos)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (randomizedPhotos.length === 0 || paused) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % randomizedPhotos.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [randomizedPhotos, paused])

  if (loading || randomizedPhotos.length === 0) {
    return null
  }

  const current = randomizedPhotos[currentIndex]

  return (
    <section className="py-12 px-8 md:px-16 bg-amm-dark text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase">Nossa Galeria — Momentos AMM Brasil MC</h2>

        <div
          className="relative rounded-lg overflow-hidden h-64 md:h-80 bg-black group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Imagem com fade transition */}
          <img
            key={current.id}
            src={current.url}
            alt={current.caption}
            className="w-full h-full object-cover opacity-0 animate-fadeIn"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EErro ao carregar%3C/text%3E%3C/svg%3E'
            }}
          />

          {/* Caption overlay */}
          {current.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-gray-200 text-sm md:text-base">{current.caption}</p>
            </div>
          )}

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {randomizedPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-amm-orange w-3 h-3'
                    : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                }`}
                aria-label={`Ir para foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 700ms ease-in-out forwards;
        }
      `}</style>
    </section>
  )
}
