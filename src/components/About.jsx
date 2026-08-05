import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useFadeUpOnScroll } from '../hooks/useScrollScene'
import familyImage from '../images/family.webp'
import meImage from '../images/Me.webp'
import poleVaultImage from '../images/poleVaultImage.webp'
import teamImage from '../images/Team.webp'
import './About.css'
import StatsCounter from './StatsCounter'

const AboutImage = ({ src, alt, className = '', y }) => (
  <motion.figure className={`about-image ${className}`} style={{ y }}>
    <div className="about-image-inner">
      <img src={src} alt={alt} loading="lazy" />
    </div>
  </motion.figure>
)

const About = () => {
  const aboutRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start']
  })

  // Reduced range so the parallax reads as drift, not travel.
  const yLead = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yTrail = useTransform(scrollYProgress, [0, 1], [20, -20])

  useFadeUpOnScroll(aboutRef, {
    // Targets the inner wrapper, not .about-image — Framer owns that node's transform.
    childSelector: '.about-eyebrow, .about-pullquote, .about-text p, .about-image-inner'
  })

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="section-container">
        <p className="eyebrow about-eyebrow">01 / About</p>

        <p className="about-pullquote">
          Exploring at the intersection of technology and creativity.
        </p>

        <div className="about-body grid-12">
          <div className="about-text">
            <p>
              My name is Brandon Foley, and I am currently a Senior at Chapman University, where I will
              also be pursuing a Masters degree in Electrical Engineering and Computer Science.
              My interest in computer science began during high school, where I initially explored
              graphic design due to the unavailability of coding classes. However, I soon realized
              that graphic design was not for me. It was not until the following year, when I enrolled
              in my first coding class, that my love for programming started. This experience led me to
              pursue a major in computer science at the university level. Since 2021, I have been dedicated
              to honing my coding skills and actively seeking new challenges and opportunities.
            </p>
            <p>
              I am keen on collaborative as well as independent work, each presenting distinct
              advantages. Working within a team setting fosters a diverse range of ideas and approaches,
              allowing for more efficient problem-solving. Conversely, pursuing personal projects enables me
              to showcase my individual capabilities. Looking ahead, my aspirations involve contributing to a
              motivated company or developing my own technological innovations. I also maintain a strong interest
              in quantum computing, an area I am actively exploring.
            </p>
            <p>
              In addition to my academic pursuits, I am a committed athlete on Chapman University's track and field
              team. I derive great fulfillment from physical activities and outdoor experiences, such as hiking and
              snorkeling. Moreover, I have a profound passion for travel and have explored over 30 National Parks
              across the United States. I eagerly anticipate the prospect of broadening my coding expertise, engaging
              in athletics, and experiencing all that life has to offer. Continuously driven by a thirst for novelty and
              adventure, I am excited to embrace the opportunities that lie ahead.
            </p>

            <AboutImage src={familyImage} alt="Family" className="is-under-text" y={yTrail} />
          </div>

          <div className="about-images">
            <AboutImage src={meImage} alt="Brandon Foley" y={yLead} />
            <AboutImage src={poleVaultImage} alt="Pole vaulting" y={yTrail} />
            <AboutImage src={teamImage} alt="Track team" y={yLead} />
          </div>
        </div>
      </div>

      <StatsCounter />
    </section>
  )
}

export default About
