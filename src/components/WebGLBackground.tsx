import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useDetectGPU } from '@react-three/drei'

// Separate component for the animated mesh
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#1e40af" wireframe />
    </mesh>
  )
}

export default function WebGLBackground() {
  const [mounted, setMounted] = useState(false)
  const [fallback, setFallback] = useState(false)
  
  // Only render on client side
  useEffect(() => {
    setMounted(true)
    
    // Check if WebGL is supported
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setFallback(true)
    }
  }, [])
  
  // Show nothing during SSR
  if (!mounted) return null
  
  // Fallback for devices without WebGL support
  if (fallback) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-black to-blue-950 -z-10">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
      </div>
    )
  }
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <AnimatedSphere />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
    </div>
  )
}
