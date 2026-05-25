import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { fetchGalleryPhotos, type GalleryPhoto } from '../lib/supabase'

function GalleryLightbox({
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
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white rounded-full p-2 transition"
        >
          <X size={24} />
        </button>

        {/* Imagem */}
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

        {/* Caption */}
        {current.caption && (
          <div className="bg-black/80 text-gray-200 text-center py-3 text-sm px-4 rounded-b-lg">
            {current.caption}
          </div>
        )}

        {/* Navegação */}
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

export default function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null)

  useEffect(() => {
    fetchGalleryPhotos()
      .then(setPhotos)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section id="galeria" className="py-16 px-8 md:px-16 bg-amm-dark text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">Carregando galeria...</p>
        </div>
      </section>
    )
  }

  if (photos.length === 0) {
    return null
  }

  return (
    <section id="galeria" className="py-16 px-8 md:px-16 bg-amm-dark text-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-b from-amm-orange to-amm-dark py-8 px-8 md:px-12 rounded-lg mb-10">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-center">Galeria</h2>
          <p className="text-lg text-gray-300 text-center mt-2">Conheça os membros do AMM Brasil MC</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3E?%3C/text%3E%3C/svg%3E'
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-4xl">🔍</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <GalleryLightbox photo={selectedPhoto} allPhotos={photos} onClose={() => setSelectedPhoto(null)} />
      )}
    </section>
  )
}
