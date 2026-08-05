import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import './Hero.css'

// Code-split the WebGL stack (three/drei/postprocessing) into its own chunk so
// it doesn't block first paint of the headline.
const Hero3D = lazy(() => import('./Hero3D'))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-canvas-layer" aria-hidden="true">
        <Suspense fallback={<div className="hero-canvas-fallback" />}>
          <Hero3D />
        </Suspense>
      </div>

      <motion.div
        className="hero-content grid-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-copy">
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="title-line">Crafting Digital</span>
            <span className="title-line title-line-outline">Innovation</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            A Digital Portfolio by Brandon Foley
          </motion.p>
        </div>

        <motion.div className="hero-meta" variants={itemVariants}>
          <p>Software Engineer | Sony Interactive Entertainment</p>
        </motion.div>
      </motion.div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  )
}

export default Hero
