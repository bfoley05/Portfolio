import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const hero = heroRef.current
      if (!hero) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPercent = (clientX / innerWidth) * 100
      const yPercent = (clientY / innerHeight) * 100

      hero.style.backgroundPosition = `${xPercent}% ${yPercent}%`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={itemVariants}>
          <motion.span 
            className="title-line"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Crafting Digital
          </motion.span>
          <motion.span 
            className="title-line highlight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Innovation
          </motion.span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          variants={textVariants}
        >
          A Digital Portfolio by Brandon Foley
        </motion.p>
        <motion.div 
          className="hero-description"
          variants={textVariants}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Software Engineer | Raytheon / Collins Aerospace
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Exploring the Frontiers of Technology
          </motion.p>
        </motion.div>
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <motion.div 
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
      <div className="hero-particles"></div>
    </section>
  )
}

export default Hero

