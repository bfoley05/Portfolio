import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './TypingText.css'

const TypingText = ({ text, speed = 100, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayedText, text, speed])

  return (
    <span className={`typing-text ${className}`}>
      {displayedText}
      {isTyping && (
        <motion.span
          className="typing-cursor"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}

export default TypingText

