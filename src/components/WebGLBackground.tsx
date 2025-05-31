import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

// Simple fallback component if WebGL fails
const FallbackBackground = () => (
  <div className="fixed inset-0 bg-black -z-10">
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
  </div>
)

// Simple particle system that doesn't rely on complex geometries
function ParticleField() {
  const points = useRef()
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })
  
  // Create a simple particle system with basic geometry
  const particleCount = 500 // Reduced from 1000 for better performance
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10
  }
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#4060ff"
        sizeAttenuation
        transparent
        opacity={0.6} // Reduced opacity for better performance
      />
    </points>
  )
}

export default function WebGLBackground() {
  const [error, setError] = useState(false)
  
  // Handle WebGL errors gracefully
  useEffect(() => {
    const handleError = (e) => {
      console.error('WebGL error:', e)
      setError(true)
    }
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])
  
  // If there's an error, show the fallback
  if (error) {
    return <FallbackBackground />
  }
  
  try {
    return (
      <div className="fixed inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[0.5, 1]} // Reduced DPR to save memory
          gl={{ 
            powerPreference: "low-power",
            antialias: false, // Disable antialiasing to improve performance
            depth: false, // Disable depth buffer if not needed
            stencil: false, // Disable stencil buffer if not needed
            alpha: true
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color('#000000'))
          }}
        >
          <ambientLight intensity={0.3} />
          <ParticleField />
          <Environment preset="city" />
        </Canvas>
      </div>
    )
  } catch (err) {
    console.error('Failed to render WebGL background:', err)
    return <FallbackBackground />
  }
}
