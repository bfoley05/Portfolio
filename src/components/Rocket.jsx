import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './Rocket.css'

const Rocket = ({ scrollY }) => {
  const rocketRef = useRef(null)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const atTop = scrollY < 100
    setIsAtTop(atTop)
    
    // Add flame effect based on scroll
    const rocket = rocketRef.current
    if (rocket) {
      const flame = rocket.querySelector('.rocket-flame')
      if (flame) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const scrollProgress = Math.min(scrollY / maxScroll, 1)
        const flameIntensity = 0.5 + scrollProgress * 0.5
        flame.style.opacity = flameIntensity
        flame.style.height = `${20 + scrollProgress * 30}px`
      }
    }
  }, [scrollY])

  const handleClick = () => {
    if (!isAtTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={rocketRef}
        className={`rocket ${isAtTop ? 'rocket-top' : 'rocket-bottom rocket-clickable'}`}
        onClick={handleClick}
        title={isAtTop ? '' : 'Scroll to top'}
        initial={false}
        animate={{
          x: isAtTop ? 0 : 0,
          y: isAtTop ? 0 : 0,
          rotate: isAtTop ? 0 : -90,
          scale: isAtTop ? 1 : 1,
        }}
        whileHover={!isAtTop ? {
          scale: 1.15,
          y: -10,
        } : {}}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.5
        }}
      >
        <div className="rocket-body">
          <div className="rocket-nose"></div>
          <div className="rocket-window"></div>
          <div className="rocket-fins">
            <div className="fin fin-left"></div>
            <div className="fin fin-right"></div>
          </div>
        </div>
        <div className="rocket-flame"></div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Rocket

