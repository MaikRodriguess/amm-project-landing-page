import { useState } from 'react'
import { X, Menu } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Eventos', id: 'eventos' },
  { label: 'Galeria', id: 'galeria' },
  { label: 'Materiais', id: 'materiais' },
  { label: 'Quem Somos', id: 'sobre' },
  { label: 'Contato', id: 'contato' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-amm-dark bg-opacity-95 flex items-center justify-between px-6 md:px-16 py-4 border-b border-amm-orange border-opacity-20">
        {/* Logo & Brand */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer"
        >
          <img
            src="https://i0.wp.com/amm-brasil.siteoficial.org.br/wp-content/uploads/2024/12/Logo-AMM-Brasil-ofcial-Branca-3.png?w=60&ssl=1"
            alt="AMM Brasil MC Logo"
            className="h-12 w-auto"
          />
          <span className="text-white font-bold text-lg uppercase tracking-tight hidden sm:inline">
            AMM Brasil MC
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-white text-sm uppercase hover:text-amm-orange transition-colors cursor-pointer bg-none border-none"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile — Hamburger Button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-11 h-11 border-2 border-white/60 rounded-lg hover:border-amm-orange hover:text-amm-orange text-white transition-colors duration-200"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-amm-dark border-l border-amm-orange/20 flex flex-col pt-24 pb-10 px-8 transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Fechar */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition"
          aria-label="Fechar menu"
        >
          <X size={24} />
        </button>

        {/* Logo no drawer */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="https://i0.wp.com/amm-brasil.siteoficial.org.br/wp-content/uploads/2024/12/Logo-AMM-Brasil-ofcial-Branca-3.png?w=60&ssl=1"
            alt="Logo"
            className="h-10 w-auto"
          />
          <div>
            <p className="text-white font-bold text-base uppercase leading-tight">AMM Brasil MC</p>
            <p className="text-amm-orange text-xs">📍 Rondônia</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-white text-base uppercase font-semibold py-3 px-4 rounded-lg hover:bg-amm-orange/10 hover:text-amm-orange transition-colors duration-150 border border-transparent hover:border-amm-orange/20"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Rodapé do drawer */}
        <div className="mt-auto text-gray-600 text-xs text-center">
          AMM Brasil MC © 2026
        </div>
      </aside>
    </>
  )
}
