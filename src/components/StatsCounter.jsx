import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './StatsCounter.css'

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="animated-counter">
      {count}
    </span>
  )
}

const STATS = [
  { value: 14, suffix: '+', label: 'Projects' },
  { value: 30, suffix: '+', label: 'National Parks' },
  { value: 3, suffix: '', label: 'Awards Won' },
  { value: 100, suffix: '%', label: 'Dedication' }
]

const StatsCounter = () => {
  return (
    <section className="stats-section">
      <div className="stats-container section-container">
        {STATS.map(({ value, suffix, label }) => (
          <div className="stat-item" key={label}>
            <div className="stat-value">
              <AnimatedCounter value={value} />
              {suffix && <span className="stat-suffix">{suffix}</span>}
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsCounter
