'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, Canvas } from '@react-three/fiber'
import { useScroll } from 'framer-motion'

const Particles = ({ count = 1000, scrollY = 0 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const light = useRef<THREE.PointLight>(null!)
  
  useEffect(() => {
    // Create positions for particles
    const dummy = new THREE.Object3D()
    const particles = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      particles[i3] = (Math.random() - 0.5) * 10
      particles[i3 + 1] = (Math.random() - 0.5) * 10
      particles[i3 + 2] = (Math.random() - 0.5) * 10
      
      dummy.position.set(
        particles[i3],
        particles[i3 + 1],
        particles[i3 + 2]
      )
      
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    
    mesh.current.instanceMatrix.needsUpdate = true
  }, [count])
  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    
    // Move light in a circular pattern
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.2) * 3
      light.current.position.y = Math.cos(time * 0.2) * 3
    }
    
    // Rotate particles based on scroll
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05 + scrollY * 0.01
      mesh.current.rotation.x = time * 0.03 + scrollY * 0.005
    }
  })
  
  return (
    <>
      <pointLight ref={light} distance={10} intensity={2} color="#0ea5e9" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#4c1d95" emissiveIntensity={0.2} />
      </instancedMesh>
    </>
  )
}

export default function WebGLBackground() {
  const { scrollY } = useScroll()
  const scrollRef = useRef(0)
  
  useEffect(() => {
    return scrollY.onChange(latest => {
      scrollRef.current = latest
    })
  }, [scrollY])
  
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <Particles scrollY={scrollRef.current} />
      </Canvas>
    </div>
  )
}
