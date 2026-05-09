import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { BackgroundMusic } from './components/BackgroundMusic'

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de administração — layout próprio, sem Navbar/Footer */}
        <Route path="/admin" element={<Admin />} />

        {/* Landing page principal */}
        <Route
          path="*"
          element={
            <>
              <BackgroundMusic src="/music/background.mp3" volume={0.3} loop={true} />
              <div className="bg-amm-dark min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow pt-16">
                  <Home />
                </main>
                <Footer />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
