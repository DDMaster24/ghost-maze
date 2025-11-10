import { useRef, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useGameStore } from '../stores/gameStore'
import { WeaponType, PowerUpType } from '../types/game'
import * as THREE from 'three'

interface PowerPelletProps {
  id: string
  position: [number, number, number]
  powerUpType: PowerUpType
  onCollect: (id: string) => void
}

function PowerPellet({ id, position, powerUpType, onCollect }: PowerPelletProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const rigidBodyRef = useRef<any>(null)

  // Pulsing animation
  useEffect(() => {
    if (!meshRef.current) return

    let time = 0
    const interval = setInterval(() => {
      time += 0.1
      if (meshRef.current) {
        const scale = 1 + Math.sin(time) * 0.3
        meshRef.current.scale.set(scale, scale, scale)
        meshRef.current.rotation.y += 0.05
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

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

        if (distance < 1.2) {
          onCollect(id)
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [id, onCollect])

  const getColorByType = () => {
    switch (powerUpType) {
      case PowerUpType.BLASTER:
        return '#ff6b00'
      case PowerUpType.RAPID_FIRE:
        return '#ff0000'
      case PowerUpType.SHIELD:
        return '#0099ff'
      case PowerUpType.SPEED_BOOST:
        return '#ffff00'
      default:
        return '#ff6b00'
    }
  }

  const color = getColorByType()

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="fixed"
      position={position}
      sensor
    >
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh scale={1.5}>
        <torusGeometry args={[0.35, 0.05, 8, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Strong point light */}
      <pointLight position={[0, 0, 0]} color={color} intensity={3} distance={6} />
    </RigidBody>
  )
}

export default PowerPellet
