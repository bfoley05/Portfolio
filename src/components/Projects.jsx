import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './Projects.css'
import TypingText from './TypingText'

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const projectsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current)
      }
    }
  }, [])

  const projects = [
    {
      title: "MYSQL Rideshare App",
      description: "Designed and implemented a normalized MySQL database for a ride-sharing app, including ER diagrams, schema creation, and referential integrity with primary and foreign keys. In addition we used Python logic to manage user sessions and the overall workflow of the app and NextJS for frontend.",
      tags: ["SQL", "Python", "NextJS"]
    },
    {
      title: "CHOC AWS Datathon Project Winner",
      description: "Utilized python and its many libraries to create neural networks, linear regression, and random forest models to try and make the best use of the data that we could. We used real data from the medical world to develop this program and perform preprocessing.",
      tags: ["AI", "Python", "AWS", "Datathon"]
    },
    {
      title: "AWS Deep Racer Event Winner",
      description: "I designed a reward function to optimize the performance of a car on a race track, utilizing Python and AWS for the development and testing of the reward function. Additionally, I was honored with an award for achieving the fastest car among all participants.",
      tags: ["AI", "Python", "AWS"]
    },
    {
      title: "LA Hacks Project",
      description: "Led the development of an innovative project aimed at using AI technology to analyze various factors of a person's body to generate personalized workout materials. Our team developed two large language models integrated into our website, one utilizing OpenCV and the other leveraging Google's Gemini AI. In addition, we created a Python-based platform called REFLEX to serve as both the frontend and backend of the project.",
      tags: ["AI", "Python", "Hackathon", "Web Development"]
    },
    {
      title: "Web Development Portfolio",
      description: "Developed a personal portfolio website showcasing my programming projects. Used HTML/CSS for the frontend development. Different effects and styles applied using CSS and JS to improve user interface.",
      tags: ["Web Development", "HTML", "CSS", "JS"]
    },
    {
      title: "Lazily Balanced Database",
      description: "Simulate a rudimentary database of students and faculty at a school. By using a self-rotating BST I am able to simulate this with fast lookup and insert delete in good cases. Using user input we add and delete from the databases and are able to change certain aspects of students and faculty such as advisors or advisees.",
      tags: ["C++"]
    },
    {
      title: "Secure Medical Database System",
      description: "Created a comprehensive and secure medical database to store drugs and other prescriptions. I also included mock health records to simulate real patients. In addition I used an API to connect to all the medicine that are \"in stock\" at the counter.",
      tags: ["Java", "CSVs"]
    },
    {
      title: "Autonomous Car",
      description: "Engineered and created a autonomous car from scratch, handwiring the car using an arduino breadboard. In addition I used soldering and 3D printing to assist in the build. Using an Arduino IDE I wrote code to have the program avoid objects using multiple ultrasonic sensors",
      tags: ["C", "Wiring", "Soldering", "3D Printing"]
    },
    {
      title: "Retinal Abnormality AI",
      description: "Created an AI algorithm to process images of retinal scans and determine whether the image is normal or abnormal. In this I used a training, testing, and validation set to determine the accuracy of the program.",
      tags: ["Python", "Jupyter Notebook"]
    },
    {
      title: "Garmin Watch API",
      description: "Imported data from my own Garmin watch to analyze and examine my athletic trends. The program is able to display certain types of activities recorded as well as display the running power for running exercises and intensity of all workouts",
      tags: ["Java", "CSVs"]
    },
    {
      title: "Conference Seating Planning",
      description: "Created an algorithm to calculate how many people are able to see in a conference room based off their height. Receiving a text file input I am able to process the data and calculate the number based on the given heights.",
      tags: ["C++"]
    },
    {
      title: "Customer Simulation",
      description: "Simulate the income of students into a service center based on how much time they need to spend at each office and the order they come in. At this center, they are assigned the order of offices to go to and the time they will spend at each along with their start time. We simulate this and output the idle times of the windows, and wait times of customers.",
      tags: ["C++"]
    },
    {
      title: "Robber Language Translator",
      description: "Translated a file of English words or phrases and then translated them to the \"robber language\". The program then outputs the data into html format to print out the new words on a webpage",
      tags: ["C++", "HTML"]
    },
    {
      title: "Egyptian Rat Screw",
      description: "Simulated a game of egyptian ratscrew with the specified number of players. Will run through the program with random decks for each player and generate each player a \"pattern\" to look for.",
      tags: ["Java"]
    }
  ]

  const displayedProjects = showAll ? projects : projects.slice(0, 6)

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="title-number">02</span>
          {isVisible && <TypingText text="Projects" speed={150} />}
        </motion.h2>
        <p className={`section-subtitle ${isVisible ? 'visible' : ''}`}>
          Here are some of my recent works...
        </p>
        <motion.div 
          className="projects-grid"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="project-glow"></div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span 
                    key={tagIndex} 
                    className="tag"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {projects.length > 6 && (
          <div className="projects-toggle">
            <button
              onClick={() => setShowAll(!showAll)}
              className="toggle-btn"
            >
              {showAll ? 'See Less' : 'See More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

