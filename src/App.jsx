// App.jsx
import { useEffect, useRef, useState } from 'react'
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Resume from './components/Resume'
import { usePinAndTransform } from './hooks/useScrollScene'

function App() {
  // Boolean rather than raw scrollY so scrolling doesn't re-render the tree every frame.
  const [showScrollTop, setShowScrollTop] = useState(false)
  const heroSceneRef = useRef(null)
  const aboutStageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // The site's one pinned transition: the hero holds while About rises through it.
  usePinAndTransform(heroSceneRef, {
    id: 'hero-to-about',
    distance: () => window.innerHeight,
    scrub: 0.8,
    layers: [
      {
        target: '.hero-canvas-layer',
        from: { scale: 1, opacity: 1 },
        to: { scale: 1.35, opacity: 0 },
        duration: 0.7
      },
      // Clears early so the hero headline never sits behind the About copy.
      {
        target: '.hero-content',
        from: { yPercent: 0, opacity: 1 },
        to: { yPercent: -12, opacity: 0 },
        duration: 0.45
      },
      {
        target: '.hero-scroll-hint',
        from: { opacity: 1 },
        to: { opacity: 0 },
        duration: 0.25
      },
      {
        target: aboutStageRef,
        from: { scale: 0.94, opacity: 0, transformOrigin: '50% 0%' },
        to: { scale: 1, opacity: 1 },
        duration: 0.8
      }
    ]
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Header />

      <div className="hero-section-container" ref={heroSceneRef}>
        <Hero />
      </div>

      <div className="about-stage" ref={aboutStageRef}>
        <About />
      </div>

      <Projects />
      <Resume />
      <Contact />

      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ion-icon name="chevron-up-outline"></ion-icon>
      </button>
    </div>
  )
}

export default App
