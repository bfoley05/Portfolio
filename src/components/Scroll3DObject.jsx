import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './Scroll3DObject.css'

const Scroll3DObject = () => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const stationGroupRef = useRef(null)
  const animationIdRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = null // Transparent
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 8)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0x00bcd4, 0.4)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00bcd4, 1.5, 50)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xffd700, 1, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Create a complex space station / satellite structure
    const stationGroup = new THREE.Group()
    stationGroupRef.current = stationGroup

    // Central hub
    const hubGeo = new THREE.OctahedronGeometry(1, 0)
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x00bcd4,
      emissive: 0x003c6c,
      metalness: 0.9,
      roughness: 0.1
    })
    const hub = new THREE.Mesh(hubGeo, hubMat)
    stationGroup.add(hub)

    // Solar panels
    const panelGeo = new THREE.BoxGeometry(0.1, 2.5, 1.5)
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1a237e,
      emissive: 0x0a0e27,
      metalness: 0.8,
      roughness: 0.2
    })

    const panels = []
    for (let i = 0; i < 4; i++) {
      const panel = new THREE.Mesh(panelGeo, panelMat)
      const angle = (i / 4) * Math.PI * 2
      panel.position.set(
        Math.cos(angle) * 2.5,
        Math.sin(angle) * 0.3,
        Math.sin(angle) * 0.3
      )
      panel.rotation.z = angle
      panels.push(panel)
      stationGroup.add(panel)
    }

    // Orbiting rings
    const ringGeo = new THREE.TorusGeometry(1.8, 0.05, 16, 100)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00bcd4,
      emissive: 0x003c6c,
      metalness: 1,
      roughness: 0.1
    })
    const ring1 = new THREE.Mesh(ringGeo, ringMat)
    ring1.rotation.x = Math.PI / 2
    stationGroup.add(ring1)

    const ring2 = new THREE.Mesh(ringGeo, ringMat)
    ring2.rotation.y = Math.PI / 2
    stationGroup.add(ring2)

    // Small satellites orbiting
    const satGeo = new THREE.IcosahedronGeometry(0.15, 0)
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0x8a6f00,
      metalness: 1,
      roughness: 0.2
    })

    const satellites = []
    for (let i = 0; i < 8; i++) {
      const sat = new THREE.Mesh(satGeo, satMat)
      sat.userData = {
        angle: (i / 8) * Math.PI * 2,
        radius: 2.2,
        originalAngle: (i / 8) * Math.PI * 2
      }
      satellites.push(sat)
      stationGroup.add(sat)
    }

    // Antenna array
    const antennaGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8)
    const antennaMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1
    })
    for (let i = 0; i < 6; i++) {
      const antenna = new THREE.Mesh(antennaGeo, antennaMat)
      const angle = (i / 6) * Math.PI * 2
      antenna.position.set(
        Math.cos(angle) * 0.8,
        1.2,
        Math.sin(angle) * 0.8
      )
      antenna.rotation.x = Math.PI / 2
      stationGroup.add(antenna)
    }

    scene.add(stationGroup)

    // Stars background
    const starGeo = new THREE.BufferGeometry()
    const starCount = 200 // Reduced for performance since it's always visible
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      opacity: 0.4
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Animation function
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const stationGroup = stationGroupRef.current
      if (!stationGroup) return

      // Smooth constant rotation
      stationGroup.rotation.y += 0.005
      stationGroup.rotation.x += 0.002

      // Rotate hub
      hub.rotation.x += 0.01
      hub.rotation.y += 0.015

      // Rotate rings
      ring1.rotation.z += 0.005
      ring2.rotation.x += 0.005

      // Animate panels
      panels.forEach((panel, i) => {
        panel.rotation.y = Math.sin(Date.now() * 0.001 + i) * 0.1
      })

      // Orbit satellites
      satellites.forEach((sat) => {
        sat.userData.angle += 0.02
        sat.position.set(
          Math.cos(sat.userData.angle) * sat.userData.radius,
          Math.sin(sat.userData.angle * 2) * 0.5,
          Math.sin(sat.userData.angle) * sat.userData.radius
        )
        sat.rotation.x += 0.02
        sat.rotation.y += 0.03
      })

      // Rotate stars slowly
      stars.rotation.y += 0.0003

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return
      cameraRef.current.aspect = container.clientWidth / container.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (container && rendererRef.current?.domElement.parentNode) {
        container.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-3d-object" />
  )
}

export default Scroll3DObject