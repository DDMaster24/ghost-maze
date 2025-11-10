import { useRef, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useGameStore } from '../stores/gameStore'
import * as THREE from 'three'

interface HealthPotionProps {
  id: string
  position: [number, number, number]
  healAmount: number
  onCollect: (id: string) => void
}

function HealthPotion({ id, position, healAmount, onCollect }: HealthPotionProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rigidBodyRef = useRef<any>(null)

  // Bobbing animation
  useEffect(() => {
    if (!groupRef.current) return

    let time = 0
    const interval = setInterval(() => {
      time += 0.03
      if (groupRef.current) {
        groupRef.current.position.y = position[1] + Math.sin(time) * 0.1
        groupRef.current.rotation.y += 0.02
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

      const potionPos = rb.translation()
      const playerPos = useGameStore.getState().playerPosition

      if (playerPos) {
        const distance = Math.sqrt(
          Math.pow(potionPos.x - playerPos[0], 2) +
          Math.pow(potionPos.y - playerPos[1], 2) +
          Math.pow(potionPos.z - playerPos[2], 2)
        )

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
      sensor
    >
      <group ref={groupRef}>
        {/* Potion bottle */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
          <meshStandardMaterial
            color="#ff1744"
            transparent
            opacity={0.8}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
        {/* Potion cork */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.1, 8]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
        {/* Potion base */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.1, 8]} />
          <meshStandardMaterial
            color="#ff1744"
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Inner liquid glow */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.13, 0.35, 8]} />
          <meshBasicMaterial
            color="#ff1744"
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Glow effect */}
        <pointLight position={[0, 0.2, 0]} color="#ff1744" intensity={1.5} distance={3} />
      </group>
    </RigidBody>
  )
}

export default HealthPotion
