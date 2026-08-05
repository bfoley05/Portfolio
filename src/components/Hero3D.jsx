import { Icosahedron, MeshTransmissionMaterial } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ACCENT = '#8b5cf6'

const fresnelVertexShader = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDir = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`

const fresnelFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uPower;
  varying vec3 vNormalView;
  varying vec3 vViewDir;

  void main() {
    float facing = abs(dot(normalize(vNormalView), normalize(vViewDir)));
    float rim = pow(1.0 - facing, uPower);
    gl_FragColor = vec4(uColor * rim * uIntensity, rim);
  }
`

/** Accent-colored fresnel shell — the only element bright enough to bloom. */
const RimLight = () => {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(ACCENT).multiplyScalar(1.6) },
      uIntensity: { value: 1.1 },
      uPower: { value: 2.8 },
    }),
    []
  )

  return (
    <Icosahedron args={[1.46, 12]}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={fresnelVertexShader}
        fragmentShader={fresnelFragmentShader}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </Icosahedron>
  )
}

const Blob = ({ lowPower }) => {
  const groupRef = useRef(null)
  const meshRef = useRef(null)
  const transmissionBackground = useMemo(() => new THREE.Color('#0b0b0b'), [])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const ease = Math.min(delta * 2.2, 1)
    group.rotation.y += (state.pointer.x * 0.4 - group.rotation.y) * ease
    group.rotation.x += (-state.pointer.y * 0.28 - group.rotation.x) * ease

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.14
      meshRef.current.rotation.z += delta * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      <Icosahedron ref={meshRef} args={[1.35, lowPower ? 6 : 10]}>
        {lowPower ? (
          <meshStandardMaterial color="#17171a" roughness={0.3} metalness={0.7} />
        ) : (
          <MeshTransmissionMaterial
            samples={2}
            resolution={128}
            thickness={1.1}
            roughness={0.24}
            anisotropy={0.35}
            chromaticAberration={0.05}
            distortion={0.45}
            distortionScale={0.4}
            temporalDistortion={0.12}
            ior={1.35}
            color="#cfcfcd"
            background={transmissionBackground}
          />
        )}
      </Icosahedron>
      <RimLight />
    </group>
  )
}

const ParticleField = ({ count }) => {
  const pointsRef = useRef(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    // Dim enough to sit below the bloom luminance threshold.
    const monochrome = new THREE.Color('#f5f5f3').multiplyScalar(0.3)
    const accent = new THREE.Color(ACCENT).multiplyScalar(1.7)

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const color = Math.random() < 0.07 ? accent : monochrome
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    const points = pointsRef.current
    if (!points) return

    const ease = Math.min(delta * 1.4, 1)
    points.rotation.y += delta * 0.02
    points.rotation.x += (state.pointer.y * 0.1 - points.rotation.x) * ease
    points.position.x += (state.pointer.x * 0.5 - points.position.x) * ease
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  )
}

const getTier = () => {
  if (typeof window === 'undefined') return 'full'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off'
  return window.innerWidth < 768 ? 'low' : 'full'
}

const Hero3D = () => {
  const [tier, setTier] = useState(getTier)
  const [isOnScreen, setIsOnScreen] = useState(true)
  // Hold the canvas mount until after first paint so the headline is the LCP,
  // not the WebGL context init.
  const [ready, setReady] = useState(false)
  const holderRef = useRef(null)

  useEffect(() => {
    const update = () => setTier(getTier())
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    window.addEventListener('resize', update)
    motionQuery.addEventListener('change', update)
    return () => {
      window.removeEventListener('resize', update)
      motionQuery.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const schedule =
      window.requestIdleCallback ?? ((cb) => setTimeout(cb, 150))
    const cancel = window.cancelIdleCallback ?? clearTimeout
    const handle = schedule(() => setReady(true), { timeout: 400 })
    return () => cancel(handle)
  }, [])

  // Stop rendering entirely once the hero has scrolled away.
  useEffect(() => {
    const holder = holderRef.current
    if (!holder) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(holder)
    return () => observer.disconnect()
  }, [tier])

  if (tier === 'off') {
    return <div className="hero-canvas-fallback" aria-hidden="true" />
  }

  const isFull = tier === 'full'

  return (
    <div className="hero-canvas-holder" ref={holderRef}>
      {/* Static gradient stands in until the canvas is scheduled to mount */}
      {!ready && <div className="hero-canvas-fallback" aria-hidden="true" />}
      {ready && (
      <Canvas
        className="hero-canvas"
        frameloop={isOnScreen ? 'always' : 'never'}
        dpr={[1, isFull ? 1.5 : 1.25]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-4, -2, -3]} color={ACCENT} intensity={30} distance={16} />
        <ParticleField count={isFull ? 700 : 350} />
        <Blob lowPower={!isFull} />
        {isFull && (
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              mipmapBlur
              intensity={0.55}
              luminanceThreshold={0.62}
              luminanceSmoothing={0.25}
              radius={0.7}
            />
          </EffectComposer>
        )}
      </Canvas>
      )}
    </div>
  )
}

export default Hero3D
