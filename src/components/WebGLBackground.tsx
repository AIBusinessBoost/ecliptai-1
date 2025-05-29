'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const ParticleField = () => {
  const points = useRef<THREE.Points>(null)
  
  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.05
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.1
    }
  })
  
  const particleCount = 3000
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 5
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      // Create a sphere distribution with some randomness
      const x = radius * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 2
      const y = radius * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 2
      const z = radius * Math.cos(phi) + (Math.random() - 0.5) * 2
      
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
    }
    
    return positions
  }, [particleCount])
  
  const colors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Create a gradient from blue to purple
      const blueToViolet = Math.random()
      colors[i3] = 0.1 + blueToViolet * 0.2 // R: low to medium
      colors[i3 + 1] = 0.4 + blueToViolet * 0.2 // G: medium
      colors[i3 + 2] = 0.8 - blueToViolet * 0.3 // B: high to medium
    }
    
    return colors
  }, [particleCount])
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

const GradientSphere = () => {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      mesh.current.rotation.y += 0.005
      mesh.current.rotation.z += 0.002
    }
  })
  
  return (
    <Sphere ref={mesh} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshPhongMaterial
        color="#0ea5e9"
        emissive="#7c3aed"
        emissiveIntensity={0.5}
        transparent
        opacity={0.1}
        shininess={100}
      />
    </Sphere>
  )
}

const FloatingLights = () => {
  const group = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })
  
  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = 3.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(i * 0.5) * 0.5
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#38bdf8" : "#8b5cf6"} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function WebGLBackground() {
  return (
    <div className="webgl-background fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#8b5cf6" />
        <GradientSphere />
        <ParticleField />
        <FloatingLights />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <fog attach="fog" args={['#0f172a', 8, 25]} />
      </Canvas>
    </div>
  )
}
