import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './SpaceScene.css'

const SpaceScene = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050810)

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 4, 14)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.maxDistance = 25
    controls.minDistance = 6

    // Lights
    const ambient = new THREE.AmbientLight(0x80d8ff, 0.6)
    scene.add(ambient)

    const dir = new THREE.DirectionalLight(0xffffff, 1.1)
    dir.position.set(5, 8, 5)
    scene.add(dir)

    // Planet
    const planetGeo = new THREE.SphereGeometry(3.2, 64, 64)
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x0f1d4b,
      emissive: 0x0b254f,
      metalness: 0.4,
      roughness: 0.45
    })
    const planet = new THREE.Mesh(planetGeo, planetMat)
    scene.add(planet)

    // Atmosphere glow
    const glowGeo = new THREE.SphereGeometry(3.25, 64, 64)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00bcd4,
      transparent: true,
      opacity: 0.12
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    scene.add(glow)

    // Orbiting ring
    const ringGeo = new THREE.TorusGeometry(5, 0.08, 16, 120)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00bcd4,
      emissive: 0x003c6c,
      metalness: 0.8,
      roughness: 0.2
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.4
    scene.add(ring)

    // Satellites
    const satellites = []
    const satGeo = new THREE.IcosahedronGeometry(0.25, 0)
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0x8a6f00,
      metalness: 1,
      roughness: 0.3
    })
    const satCount = 6
    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat)
      sat.userData.radius = 5.6 + Math.random() * 0.8
      sat.userData.speed = 0.004 + Math.random() * 0.002
      sat.userData.phase = Math.random() * Math.PI * 2
      satellites.push(sat)
      scene.add(sat)
    }

    // Stars
    const starGeo = new THREE.BufferGeometry()
    const starCount = 700
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 400
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.9,
      transparent: true,
      opacity: 0.8
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Simple rocket probe
    const probe = new THREE.Group()
    const bodyGeo = new THREE.CylinderGeometry(0.2, 0.35, 2.4, 12)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.7,
      roughness: 0.35
    })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    probe.add(body)

    const noseGeo = new THREE.ConeGeometry(0.35, 0.6, 12)
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      metalness: 0.5,
      roughness: 0.4
    })
    const nose = new THREE.Mesh(noseGeo, noseMat)
    nose.position.y = 1.5
    probe.add(nose)

    const finGeo = new THREE.BoxGeometry(0.05, 0.6, 0.5)
    const finMat = new THREE.MeshStandardMaterial({ color: 0x00bcd4 })
    const finOffsets = [
      [0, -1, 0.35],
      [0.35, -1, 0],
      [0, -1, -0.35],
      [-0.35, -1, 0]
    ]
    finOffsets.forEach(([x, y, z]) => {
      const fin = new THREE.Mesh(finGeo, finMat)
      fin.position.set(x, y, z)
      probe.add(fin)
    })

    probe.position.set(0, 0, 7.5)
    probe.rotation.z = Math.PI / 6
    scene.add(probe)

    const probePathRadius = 7.5
    let time = 0

    const mouse = { x: 0, y: 0 }
    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }
    renderer.domElement.addEventListener('pointermove', onPointerMove)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    const animate = () => {
      time += 0.01

      planet.rotation.y += 0.0008
      glow.rotation.y += 0.0005
      ring.rotation.z += 0.0004
      stars.rotation.y += 0.0002

      satellites.forEach((sat, i) => {
        const t = time * sat.userData.speed + sat.userData.phase
        sat.position.set(
          Math.cos(t) * sat.userData.radius,
          Math.sin(t * 1.4) * 0.6,
          Math.sin(t) * sat.userData.radius
        )
        sat.rotation.x += 0.01 + i * 0.002
        sat.rotation.y += 0.015 + i * 0.003
      })

      // Probe orbit
      probe.position.set(
        Math.cos(time * 0.35) * probePathRadius,
        Math.sin(time * 0.6) * 1.5,
        Math.sin(time * 0.35) * probePathRadius
      )
      probe.lookAt(planet.position)
      probe.rotateY(Math.PI / 2)

      // Parallax with mouse
      scene.rotation.y = mouse.x * 0.08
      scene.rotation.x = mouse.y * 0.05

      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('pointermove', onPointerMove)
      controls.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section className="space-scene">
      <div className="space-scene-header">
        <div>
          <p className="badge">Interactive 3D</p>
          <h3>Orbital Lab</h3>
          <p className="subtitle">Satellite, probe, and planetary ring rendered live in Three.js</p>
        </div>
        <p className="hint">Drag to orbit • Scroll to zoom</p>
      </div>
      <div ref={containerRef} className="space-scene-canvas" aria-label="3D orbital scene" />
    </section>
  )
}

export default SpaceScene

