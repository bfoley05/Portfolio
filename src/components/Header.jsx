import { useEffect, useRef, useState } from 'react'
import './Header.css'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pillRef = useRef(null)

  useEffect(() => {
    const pill = pillRef.current
    let lastY = window.scrollY
    let lastTime = performance.now()
    let lastScrollAt = 0
    let targetVelocity = 0
    let currentVelocity = 0
    let frameId = null

    const tick = () => {
      // Rest state is reached ~300ms after the last scroll event.
      const idle = performance.now() - lastScrollAt > 300
      const target = idle ? 0 : targetVelocity
      currentVelocity += (target - currentVelocity) * 0.12

      if (pill) pill.style.setProperty('--vel', currentVelocity.toFixed(3))

      if (idle && currentVelocity < 0.002) {
        if (pill) pill.style.setProperty('--vel', '0')
        frameId = null
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    const handleScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      const elapsed = Math.max(now - lastTime, 16)

      targetVelocity = Math.min(Math.abs(y - lastY) / elapsed / 2.5, 1)
      lastY = y
      lastTime = now
      lastScrollAt = now

      setIsScrolled(y > 50)
      if (frameId === null) frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-pill" ref={pillRef}>
        <div className="logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">Brandon Foley</span>
        </div>
        <nav className="nav">
          <ul>
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={`menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
