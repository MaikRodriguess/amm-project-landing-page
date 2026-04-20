import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Download, BookOpen, Headphones, Video } from 'lucide-react'

export type BookLinkType = 'pdf' | 'epub' | 'audio' | 'libras' | 'infantil'

export interface BookLink {
  type: BookLinkType
  label: string
  url: string
}

export interface Book {
  id: string
  title: string
  author: string
  image: string
  links: BookLink[]
}

interface BooksCarouselProps {
  books: Book[]
}

export function BooksCarousel({ books }: BooksCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350
      const newScrollPosition =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-amm-orange bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-r-lg transition transform hover:scale-110 opacity-0 group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth scrollbar-hide flex gap-8 pb-4"
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="flex-shrink-0 w-64 group/card transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-amm-dark rounded-lg overflow-hidden shadow-2xl border-2 border-amm-orange border-opacity-30 hover:border-opacity-100 transition-all h-full flex flex-col">
              {/* Book Cover Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-amm-orange to-black h-96">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/card:bg-opacity-30 transition-all" />
              </div>

              {/* Book Info */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-amm-orange mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-400">{book.author}</p>
                </div>

                {/* Download Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {book.links.map((link) => {
                    const getButtonStyle = () => {
                      switch (link.type) {
                        case 'pdf':
                          return 'bg-red-600 hover:bg-red-700'
                        case 'epub':
                          return 'bg-purple-600 hover:bg-purple-700'
                        case 'audio':
                          return 'bg-green-600 hover:bg-green-700'
                        case 'libras':
                          return 'bg-blue-600 hover:bg-blue-700'
                        case 'infantil':
                          return 'bg-pink-600 hover:bg-pink-700'
                        default:
                          return 'bg-amm-orange hover:bg-orange-600'
                      }
                    }

                    const getIcon = () => {
                      switch (link.type) {
                        case 'pdf':
                          return <Download size={16} />
                        case 'epub':
                          return <BookOpen size={16} />
                        case 'audio':
                          return <Headphones size={16} />
                        case 'libras':
                          return <Video size={16} />
                        case 'infantil':
                          return <BookOpen size={16} />
                        default:
                          return <Download size={16} />
                      }
                    }

                    return (
                      <a
                        key={link.type}
                        href={link.url}
                        target={link.type === 'audio' || link.type === 'libras' ? '_blank' : undefined}
                        rel={link.type === 'audio' || link.type === 'libras' ? 'noopener noreferrer' : undefined}
                        download={link.type === 'pdf' || link.type === 'epub' ? true : undefined}
                        className={`flex items-center justify-center gap-1 ${getButtonStyle()} text-white font-bold py-2 px-3 rounded transition-colors text-xs sm:text-sm`}
                        title={link.label}
                      >
                        {getIcon()}
                        <span className="hidden sm:inline">{link.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-amm-orange bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-l-lg transition transform hover:scale-110 opacity-0 group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Custom styles for scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
