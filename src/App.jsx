// App.jsx
import { useEffect, useState } from 'react'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Rocket from './components/Rocket'
import Scroll3DObject from './components/Scroll3DObject'
import ShootingStars from './components/ShootingStars'
import StarsBackground from './components/StarsBackground'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <StarsBackground />
      <ShootingStars />
      <Rocket scrollY={scrollY} />
      <Header />
      
      {/* Hero section with 3D object positioned inside */}
      <div className="hero-section-container">
        <Hero />
        <div className="hero-3d-object-container">
          <Scroll3DObject />
        </div>
      </div>
      
      <About />
      <Projects />
      <Resume />
      <Contact />
    </div>
  )
}

export default App