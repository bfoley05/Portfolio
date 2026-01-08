import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './Contact.css'
import TypingText from './TypingText'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const contactRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current)
      }
    }
  }, [])

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="title-number">04</span>
          {isVisible && <TypingText text="Contact Me" speed={150} />}
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 0.8 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          I'd love to hear from you...
        </motion.p>
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div 
            className="contact-icons"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.a
              href="https://www.linkedin.com/in/brandon-foley-a5975b290/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon linkedin"
              aria-label="LinkedIn"
              variants={{
                hidden: { opacity: 0, y: 50, rotate: -180 },
                visible: { opacity: 1, y: 0, rotate: 0 }
              }}
              whileHover={{ scale: 1.15, rotate: 5, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <ion-icon name="logo-linkedin"></ion-icon>
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              href="https://github.com/bfoley05"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon github"
              aria-label="GitHub"
              variants={{
                hidden: { opacity: 0, y: 50, rotate: -180 },
                visible: { opacity: 1, y: 0, rotate: 0 }
              }}
              whileHover={{ scale: 1.15, rotate: -5, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <ion-icon name="logo-github"></ion-icon>
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="mailto:brandonfoley05@gmail.com"
              className="contact-icon email"
              aria-label="Email"
              variants={{
                hidden: { opacity: 0, y: 50, rotate: -180 },
                visible: { opacity: 1, y: 0, rotate: 0 }
              }}
              whileHover={{ scale: 1.15, rotate: 5, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <ion-icon name="mail-outline"></ion-icon>
              <span>Email</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <footer className="footer">
        <p>© 2024 Brandon Foley. All Rights Reserved.</p>
        <p className="footer-subtitle">Exploring the Frontiers of Technology</p>
      </footer>
    </section>
  )
}

export default Contact

