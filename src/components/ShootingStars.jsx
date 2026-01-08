import { useEffect, useRef } from 'react'
import './ShootingStars.css'

const ShootingStars = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createShootingStar = () => {
      const star = document.createElement('div')
      star.className = 'shooting-star'
      
      const startX = Math.random() * window.innerWidth
      const startY = Math.random() * window.innerHeight * 0.3
      const length = Math.random() * 100 + 50
      const duration = Math.random() * 2 + 1
      const delay = Math.random() * 2

      star.style.left = `${startX}px`
      star.style.top = `${startY}px`
      star.style.width = `${length}px`
      star.style.animationDuration = `${duration}s`
      star.style.animationDelay = `${delay}s`

      container.appendChild(star)

      setTimeout(() => {
        star.remove()
      }, (duration + delay) * 1000)
    }

    // Create shooting stars periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createShootingStar()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="shooting-stars-container" />
}

export default ShootingStars

