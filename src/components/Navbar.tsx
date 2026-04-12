export default function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amm-dark bg-opacity-95 flex items-center justify-between px-8 md:px-16 py-4 border-b border-amm-orange border-opacity-20">
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

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <button
          onClick={() => scrollToSection('home')}
          className="text-white text-sm uppercase hover:text-amm-orange transition-colors cursor-pointer bg-none border-none"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('materiais')}
          className="text-white text-sm uppercase hover:text-amm-orange transition-colors cursor-pointer bg-none border-none"
        >
          Materiais
        </button>
        <button
          onClick={() => scrollToSection('sobre')}
          className="text-white text-sm uppercase hover:text-amm-orange transition-colors cursor-pointer bg-none border-none"
        >
          Quem Somos
        </button>
        <button
          onClick={() => scrollToSection('participar')}
          className="text-white text-sm uppercase hover:text-amm-orange transition-colors cursor-pointer bg-none border-none"
        >
          Como Participar
        </button>
        <button
          onClick={() => scrollToSection('contato')}
          className="text-white text-sm uppercase hover:text-amm-orange transition-colors cursor-pointer bg-none border-none"
        >
          Contato
        </button>
      </div>

      {/* Mobile Menu Indicator */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={() => scrollToSection('contato')}
          className="text-amm-orange text-xs uppercase font-bold hover:text-opacity-80 transition cursor-pointer bg-none border-none"
        >
          Contato
        </button>
      </div>
    </nav>
  )
}
