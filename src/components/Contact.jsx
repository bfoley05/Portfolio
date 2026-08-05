import { useRef } from 'react'
import { useFadeUpOnScroll } from '../hooks/useScrollScene'
import './Contact.css'

const LINKS = [
  {
    label: 'Connect',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/brandon-foley-a5975b290/'
  },
  {
    label: 'Code',
    name: 'GitHub',
    href: 'https://github.com/bfoley05'
  },
  {
    label: 'Email',
    name: 'brandonfoley05@gmail.com',
    href: 'mailto:brandonfoley05@gmail.com'
  }
]

const Contact = () => {
  const contactRef = useRef(null)

  useFadeUpOnScroll(contactRef, {
    childSelector: '.contact-eyebrow, .contact-link, .footer'
  })

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="section-container">
        <p className="eyebrow contact-eyebrow">04 / Contact</p>

        <nav className="contact-links" aria-label="Contact">
          {LINKS.map(({ label, name, href }) => (
            <a
              key={label}
              href={href}
              className="contact-link"
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              <span className="contact-label">{label}</span>
              <span className="contact-name">{name}</span>
            </a>
          ))}
        </nav>
      </div>

      <footer className="footer">
        <div className="section-container footer-inner">
          <p>© {new Date().getFullYear()} Brandon Foley</p>
          <p className="footer-tagline">Built by hand, shipped with care</p>
        </div>
      </footer>
    </section>
  )
}

export default Contact
