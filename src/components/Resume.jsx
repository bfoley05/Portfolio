import { useRef } from 'react'
import { useFadeUpOnScroll } from '../hooks/useScrollScene'
import './Resume.css'

const RESUME_URL =
  'https://docs.google.com/document/d/1EM2Z9zufji7CYAGa3CTgAglUJzg-2CqCHqSOzjyKE6o/edit?tab=t.0'

const Resume = () => {
  const resumeRef = useRef(null)

  useFadeUpOnScroll(resumeRef, {
    childSelector: '.resume-eyebrow, .resume-link'
  })

  return (
    <section id="resume" className="resume" ref={resumeRef}>
      <div className="section-container">
        <p className="eyebrow resume-eyebrow">03 / Resume</p>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="resume-link"
        >
          View my resume
          <span className="resume-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}

export default Resume
