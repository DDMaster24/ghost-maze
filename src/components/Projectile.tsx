import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface ProjectileProps {
  id: string
  position: [number, number, number]
  direction: [number, number, number]
  speed?: number
  damage?: number
  color?: string
  onHit: (id: string, hitPosition: [number, number, number]) => void
  onExpire: (id: string) => void
}

function Projectile({
  id,
  position,
  direction,
  speed = 20,
  damage = 50,
  color = '#00fff5',
  onHit,
  onExpire,
}: ProjectileProps) {
  const rigidBodyRef = useRef<any>(null)
  const [lifetime, setLifetime] = useState(0)
  const MAX_LIFETIME = 3 // seconds

  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return

    // Update lifetime
    setLifetime((prev) => prev + delta)

    if (lifetime >= MAX_LIFETIME) {
      onExpire(id)
      return
    }

    // Move projectile
    const normalizedDir = new THREE.Vector3(...direction).normalize()
    rigidBodyRef.current.setLinvel({
      x: normalizedDir.x * speed,
      y: normalizedDir.y * speed,
      z: normalizedDir.z * speed,
    }, true)
  })

  // Check for collisions (simple distance-based for now)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!rigidBodyRef.current) return

      const pos = rigidBodyRef.current.translation()
      onHit(id, [pos.x, pos.y, pos.z])
    }, 50)

    return () => clearInterval(interval)
  }, [id, onHit])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      type="dynamic"
      gravityScale={0}
      sensor
    >
      <mesh castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} color={color} intensity={1} distance={2} />
    </RigidBody>
  )
}

export default Projectile
