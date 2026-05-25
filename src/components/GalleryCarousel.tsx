import { useState, useEffect, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchCarouselPhotos, type GalleryPhoto } from '../lib/supabase'

function CarouselLightbox({
  photo,
  allPhotos,
  onClose,
}: {
  photo: GalleryPhoto
  allPhotos: GalleryPhoto[]
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(allPhotos.findIndex((p) => p.id === photo.id))

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const current = allPhotos[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white rounded-full p-2 transition"
        >
          <X size={24} />
        </button>

        <div className="flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
          <img
            src={current.url}
            alt={current.caption}
            className="max-h-[70vh] max-w-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EErro ao carregar%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>

        {current.caption && (
          <div className="bg-black/80 text-gray-200 text-center py-3 text-sm px-4 rounded-b-lg">
            {current.caption}
          </div>
        )}

        {allPhotos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-amm-orange text-white rounded-full p-2 transition"
              title="Anterior (←)"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-amm-orange text-white rounded-full p-2 transition"
              title="Próxima (→)"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {allPhotos.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function GalleryCarousel() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

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
          className="relative rounded-lg overflow-hidden aspect-video bg-black group cursor-pointer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => setSelectedPhoto(current)}
        >
          {/* Imagem com fade transition */}
          <img
            key={current.id}
            src={current.url}
            alt={current.caption}
            className="w-full h-full object-cover opacity-0 animate-fadeIn group-hover:brightness-75 transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3EErro ao carregar%3C/text%3E%3C/svg%3E'
            }}
          />

          {/* Hover overlay com dica de clique */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm font-semibold">Clique para ampliar</p>
            </div>
          </div>

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

      {selectedPhoto && (
        <CarouselLightbox photo={selectedPhoto} allPhotos={photos} onClose={() => setSelectedPhoto(null)} />
      )}
    </section>
  )
}
