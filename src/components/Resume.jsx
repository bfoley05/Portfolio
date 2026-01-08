import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './Resume.css'
import TypingText from './TypingText'

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false)
  const resumeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (resumeRef.current) {
      observer.observe(resumeRef.current)
    }

    return () => {
      if (resumeRef.current) {
        observer.unobserve(resumeRef.current)
      }
    }
  }, [])

  return (
    <section id="resume" className="resume" ref={resumeRef}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="title-number">03</span>
          {isVisible && <TypingText text="Resume" speed={150} />}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.8 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Check out my resume below...
        </motion.p>
        <motion.div 
          className="resume-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div 
            className="resume-card"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="resume-icon"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              📄
            </motion.div>
            <h3>View My Resume</h3>
            <p>Click the link below to view my full resume on Google Docs</p>
            <motion.a
              href="https://docs.google.com/document/d/1EM2Z9zufji7CYAGa3CTgAglUJzg-2CqCHqSOzjyKE6o/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Resume
              <motion.span 
                className="link-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume

