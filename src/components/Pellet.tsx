import { useRef, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useGameStore } from '../stores/gameStore'
import { CollectibleType } from '../types/game'
import * as THREE from 'three'

interface PelletProps {
  id: string
  position: [number, number, number]
  onCollect: (id: string) => void
}

function Pellet({ id, position, onCollect }: PelletProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const rigidBodyRef = useRef<any>(null)

  // Floating animation
  useEffect(() => {
    if (!meshRef.current) return

    let time = 0
    const interval = setInterval(() => {
      time += 0.05
      if (meshRef.current) {
        meshRef.current.position.y = position[1] + Math.sin(time) * 0.1
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

      const pelletPos = rb.translation()
      const playerPos = useGameStore.getState().playerPosition

      if (playerPos) {
        const distance = Math.sqrt(
          Math.pow(pelletPos.x - playerPos[0], 2) +
          Math.pow(pelletPos.y - playerPos[1], 2) +
          Math.pow(pelletPos.z - playerPos[2], 2)
        )

        // Collision threshold
        if (distance < 1.0) {
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
      sensor // Allows objects to pass through but still detect collision
    >
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Glow effect */}
      <mesh scale={1.5}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.3}
        />
      </mesh>
    </RigidBody>
  )
}

export default Pellet
