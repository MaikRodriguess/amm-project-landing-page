import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BackgroundMusic } from './components/BackgroundMusic'

function App() {
  return (
    <Router>
      <BackgroundMusic src="/music/background.mp3" volume={0.3} loop={true} />
      <div className="bg-amm-dark min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Home />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
