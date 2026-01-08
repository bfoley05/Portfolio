import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './StatsCounter.css'

const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
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
      {count}{suffix}
    </span>
  )
}

const StatsCounter = () => {
  return (
    <motion.section 
      className="stats-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="stats-container">
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">
            <AnimatedCounter value={14} />
            <span className="stat-plus">+</span>
          </div>
          <div className="stat-label">Projects</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">
            <AnimatedCounter value={30} />
            <span className="stat-plus">+</span>
          </div>
          <div className="stat-label">National Parks</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">
            <AnimatedCounter value={3} />
          </div>
          <div className="stat-label">Awards Won</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-value">
            <AnimatedCounter value={100} suffix="%" />
          </div>
          <div className="stat-label">Dedication</div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default StatsCounter

