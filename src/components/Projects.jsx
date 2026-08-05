import { useEffect, useRef, useState } from 'react'
import { useFadeUpOnScroll } from '../hooks/useScrollScene'
import './Projects.css'

// Add an `image` field (an imported asset) to a project to enable its
// hover preview. Rows without one simply skip the preview panel.
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

const Projects = () => {
  const [showAll, setShowAll] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const projectsRef = useRef(null)
  const previewRef = useRef(null)
  const pointerY = useRef(0)
  const easedY = useRef(0)

  useFadeUpOnScroll(projectsRef, { childSelector: '.projects-intro, .project-row' })

  const activeProject = activeIndex === null ? null : projects[activeIndex]
  const hasPreview = Boolean(activeProject?.image)

  // Follow the cursor on a rAF loop so mouse movement never triggers a render.
  useEffect(() => {
    if (!hasPreview) return

    const panel = previewRef.current
    if (!panel) return

    let frameId = null
    easedY.current = pointerY.current

    const tick = () => {
      easedY.current += (pointerY.current - easedY.current) * 0.12
      panel.style.transform = `translate3d(0, ${easedY.current.toFixed(1)}px, 0) translateY(-50%)`
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [hasPreview])

  const handlePointerMove = (event) => {
    const panelHeight = previewRef.current?.offsetHeight ?? 220
    const margin = panelHeight / 2 + 24
    pointerY.current = Math.min(
      Math.max(event.clientY, margin),
      window.innerHeight - margin
    )
  }

  const displayedProjects = showAll ? projects : projects.slice(0, 6)

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="section-container">
        <div className="projects-intro">
          <p className="eyebrow">02 / Projects</p>
          <h2 className="projects-heading">Selected Work</h2>
        </div>

        <div
          className="projects-list"
          onMouseMove={handlePointerMove}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {displayedProjects.map((project, index) => (
            <article
              className="project-row"
              key={project.title}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="project-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-tags">
                {project.tags.map((tag) => (
                  <li className="tag" key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {projects.length > 6 && (
          <div className="projects-toggle">
            <button onClick={() => setShowAll(!showAll)} className="toggle-btn">
              {showAll ? 'See Less' : `See All ${projects.length}`}
            </button>
          </div>
        )}
      </div>

      {hasPreview && (
        <div className="project-preview" ref={previewRef} aria-hidden="true">
          <img src={activeProject.image} alt="" />
        </div>
      )}
    </section>
  )
}

export default Projects
