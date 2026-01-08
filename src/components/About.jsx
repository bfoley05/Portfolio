import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import familyImage from '../images/family.jpg'
import friendsImage from '../images/Friends.jpg'
import meImage from '../images/Me.jpg'
import parksImage from '../images/parks.jpg'
import poleVaultImage from '../images/poleVaultImage.jpg'
import teamImage from '../images/Team.jpg'
import './About.css'
import StatsCounter from './StatsCounter'
import TypingText from './TypingText'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="title-number">01</span>
          <TypingText text="About Me" speed={150} />
        </motion.h2>
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              My name is Brandon Foley, and I am currently a Senior at Chapman University, where I will
              also be pursuing a Masters degree in Electrical Engineering and Computer Science. 
              My interest in computer science began during high school, where I initially explored 
              graphic design due to the unavailability of coding classes. However, I soon realized 
              that graphic design was not for me. It was not until the following year, when I enrolled 
              in my first coding class, that my love for programming started. This experience led me to 
              pursue a major in computer science at the university level. Since 2021, I have been dedicated 
              to honing my coding skills and actively seeking new challenges and opportunities.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              I am keen on collaborative as well as independent work, each presenting distinct 
              advantages. Working within a team setting fosters a diverse range of ideas and approaches, 
              allowing for more efficient problem-solving. Conversely, pursuing personal projects enables me 
              to showcase my individual capabilities. Looking ahead, my aspirations involve contributing to a 
              motivated company or developing my own technological innovations. I also maintain a strong interest 
              in quantum computing, an area I am actively exploring.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              In addition to my academic pursuits, I am a committed athlete on Chapman University's track and field 
              team. I derive great fulfillment from physical activities and outdoor experiences, such as hiking and 
              snorkeling. Moreover, I have a profound passion for travel and have explored over 30 National Parks 
              across the United States. I eagerly anticipate the prospect of broadening my coding expertise, engaging 
              in athletics, and experiencing all that life has to offer. Continuously driven by a thirst for novelty and 
              adventure, I am excited to embrace the opportunities that lie ahead.
            </motion.p>
          </motion.div>
          <motion.div 
            className="about-images"
            style={{ y }}
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="image-grid">
              {[
                { src: meImage, alt: 'Brandon Foley', featured: true },
                { src: familyImage, alt: 'Family', position: 'top-right' },
                { src: friendsImage, alt: 'Friends', position: 'middle-right' },
                { src: poleVaultImage, alt: 'Pole Vault', position: 'bottom-left' },
                { src: teamImage, alt: 'Track Team', position: 'bottom-middle' },
                { src: parksImage, alt: 'National Parks', position: 'bottom-right' }
              ].map((image, index) => (
                <motion.div
                  key={index}
                  className={`image-item ${image.featured ? 'featured' : ''} ${image.position ? image.position : ''}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <StatsCounter />
    </section>
  )
}

export default About

