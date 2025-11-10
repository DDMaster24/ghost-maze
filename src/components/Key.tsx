import { useRef, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useGameStore } from '../stores/gameStore'
import * as THREE from 'three'

interface KeyProps {
  id: string
  position: [number, number, number]
  onCollect: (id: string) => void
}

function Key({ id, position, onCollect }: KeyProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rigidBodyRef = useRef<any>(null)

  // Rotation animation
  useEffect(() => {
    if (!groupRef.current) return

    let time = 0
    const interval = setInterval(() => {
      time += 0.05
      if (groupRef.current) {
        groupRef.current.rotation.y = time
        groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.15
      }
    }, 16)

    return () => clearInterval(interval)
  }, [position])

  // Check for player collision
  useEffect(() => {
    if (!rigidBodyRef.current) return

    const interval = setInterval(() => {
      const rb = rigidBodyRef.current
      if (!rb) return

      const keyPos = rb.translation()
      const playerPos = useGameStore.getState().playerPosition

      if (playerPos) {
        const distance = Math.sqrt(
          Math.pow(keyPos.x - playerPos[0], 2) +
          Math.pow(keyPos.y - playerPos[1], 2) +
          Math.pow(keyPos.z - playerPos[2], 2)
        )

        if (distance < 1.2) {
          onCollect(id)
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [id, onCollect])

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="fixed"
      position={position}
      sensor
    >
      <group ref={groupRef}>
        {/* Key body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
          <meshStandardMaterial
            color="#00fff5"
            emissive="#00fff5"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Key teeth */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#00fff5"
            emissive="#00fff5"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Key ring */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial
            color="#00fff5"
            emissive="#00fff5"
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Glow effect */}
        <pointLight position={[0, 0, 0]} color="#00fff5" intensity={2} distance={5} />
      </group>
    </RigidBody>
  )
}

export default Key
