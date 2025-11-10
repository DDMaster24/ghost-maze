import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useGameStore } from '../stores/gameStore'
import { GhostState } from '../types/game'
import * as THREE from 'three'

interface GhostProps {
  id: string
  initialPosition: [number, number, number]
  color: string
  patrolPoints?: [number, number, number][]
}

function Ghost({ id, initialPosition, color, patrolPoints = [] }: GhostProps) {
  const ghostRef = useRef<any>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [state, setState] = useState<GhostState>(GhostState.PATROL)
  const [currentPatrolIndex, setCurrentPatrolIndex] = useState(0)
  const [lastDamageTime, setLastDamageTime] = useState(0)

  const playerPosition = useGameStore((state) => state.playerPosition)
  const damagePlayer = useGameStore((state) => state.damagePlayer)

  // Detection range
  const DETECTION_RANGE = 8
  const ATTACK_RANGE = 1.5
  const PATROL_SPEED = 2
  const CHASE_SPEED = 4

  useFrame((frameState, delta) => {
    if (!ghostRef.current || !playerPosition) return

    const ghostPos = ghostRef.current.translation()
    const velocity = ghostRef.current.linvel()

    // Calculate distance to player
    const distanceToPlayer = Math.sqrt(
      Math.pow(ghostPos.x - playerPosition[0], 2) +
      Math.pow(ghostPos.y - playerPosition[1], 2) +
      Math.pow(ghostPos.z - playerPosition[2], 2)
    )

    // State machine
    let targetPosition: THREE.Vector3 | null = null
    let speed = PATROL_SPEED

    if (distanceToPlayer <= DETECTION_RANGE) {
      // Chase player
      setState(GhostState.CHASE)
      targetPosition = new THREE.Vector3(playerPosition[0], ghostPos.y, playerPosition[2])
      speed = CHASE_SPEED

      // Attack if close enough
      if (distanceToPlayer <= ATTACK_RANGE) {
        const currentTime = Date.now()
        if (currentTime - lastDamageTime > 1000) { // Damage once per second
          damagePlayer(10)
          setLastDamageTime(currentTime)
        }
      }
    } else {
      // Patrol
      setState(GhostState.PATROL)

      if (patrolPoints.length > 0) {
        const patrolTarget = patrolPoints[currentPatrolIndex]
        targetPosition = new THREE.Vector3(patrolTarget[0], ghostPos.y, patrolTarget[2])

        // Check if reached patrol point
        const distanceToPatrol = Math.sqrt(
          Math.pow(ghostPos.x - patrolTarget[0], 2) +
          Math.pow(ghostPos.z - patrolTarget[2], 2)
        )

        if (distanceToPatrol < 1) {
          setCurrentPatrolIndex((prev) => (prev + 1) % patrolPoints.length)
        }
      }
    }

    // Move towards target
    if (targetPosition) {
      const direction = new THREE.Vector3()
      direction.subVectors(targetPosition, new THREE.Vector3(ghostPos.x, ghostPos.y, ghostPos.z))
      direction.y = 0 // Keep on ground
      direction.normalize()

      ghostRef.current.setLinvel({
        x: direction.x * speed,
        y: velocity.y,
        z: direction.z * speed,
      }, true)

      // Rotate to face movement direction
      if (meshRef.current && direction.lengthSq() > 0) {
        const angle = Math.atan2(direction.x, direction.z)
        meshRef.current.rotation.y = angle
      }
    } else {
      // Stop if no target
      ghostRef.current.setLinvel({
        x: 0,
        y: velocity.y,
        z: 0,
      }, true)
    }

    // Floating animation
    if (meshRef.current) {
      const time = frameState.clock.getElapsedTime()
      meshRef.current.position.y = Math.sin(time * 3) * 0.15
    }
  })

  // Visual color based on state
  const getGhostColor = () => {
    switch (state) {
      case GhostState.CHASE:
        return '#ff0000' // Red when chasing
      case GhostState.FLEE:
        return '#0000ff' // Blue when fleeing
      case GhostState.DEAD:
        return '#666666' // Gray when dead
      default:
        return color // Normal patrol color
    }
  }

  return (
    <RigidBody
      ref={ghostRef}
      position={initialPosition}
      enabledRotations={[false, false, false]}
      lockRotations
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <group ref={meshRef}>
        {/* Ghost body */}
        <mesh castShadow position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={getGhostColor()}
            emissive={getGhostColor()}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Ghost tail (wavy bottom) */}
        <mesh castShadow position={[0, 0, 0]}>
          <coneGeometry args={[0.6, 0.8, 8]} />
          <meshStandardMaterial
            color={getGhostColor()}
            emissive={getGhostColor()}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.2, 0.6, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.2, 0.6, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Pupils */}
        <mesh position={[-0.2, 0.6, 0.5]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.2, 0.6, 0.5]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Glow effect */}
        <pointLight
          position={[0, 0.5, 0]}
          color={getGhostColor()}
          intensity={state === GhostState.CHASE ? 2 : 1}
          distance={3}
        />
      </group>
    </RigidBody>
  )
}

export default Ghost
