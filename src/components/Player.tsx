import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { Controls } from '../App'
import { useGameStore } from '../stores/gameStore'
import { useProjectileStore } from '../stores/projectileStore'
import { WeaponType } from '../types/game'
import * as THREE from 'three'

function Player() {
  const playerRef = useRef<any>(null)
  const [, get] = useKeyboardControls<Controls>()
  const [lastShootTime, setLastShootTime] = useState(0)
  const [cameraDirection, setCameraDirection] = useState(new THREE.Vector3(0, 0, -1))

  const currentWeapon = useGameStore((state) => state.currentWeapon)
  const powerUpActive = useGameStore((state) => state.powerUpActive)
  const addProjectile = useProjectileStore((state) => state.addProjectile)

  useFrame((state, delta) => {
    if (!playerRef.current) return

    const { forward, back, left, right, jump, sprint, shoot } = get()

    const velocity = playerRef.current.linvel()
    const speed = sprint ? 8 : 5

    // Movement
    const movement = new THREE.Vector3()
    if (forward) movement.z -= 1
    if (back) movement.z += 1
    if (left) movement.x -= 1
    if (right) movement.x += 1

    movement.normalize().multiplyScalar(speed)

    playerRef.current.setLinvel({
      x: movement.x,
      y: velocity.y,
      z: movement.z,
    }, true)

    // Jump
    if (jump && Math.abs(velocity.y) < 0.1) {
      playerRef.current.setLinvel({
        x: velocity.x,
        y: 8,
        z: velocity.z,
      }, true)
    }

    // Camera follow and direction tracking
    const position = playerRef.current.translation()

    // Update player position in store for collision detection
    useGameStore.getState().setPlayerPosition([position.x, position.y, position.z])

    state.camera.position.lerp(
      new THREE.Vector3(position.x, position.y + 5, position.z + 10),
      0.1
    )
    state.camera.lookAt(position.x, position.y, position.z)

    // Calculate camera direction (for shooting)
    const direction = new THREE.Vector3()
    state.camera.getWorldDirection(direction)
    direction.y = 0 // Keep shots horizontal
    direction.normalize()
    setCameraDirection(direction)

    // Shooting
    if (shoot && powerUpActive && currentWeapon !== WeaponType.NONE) {
      const currentTime = Date.now()
      const fireRate = currentWeapon === WeaponType.RAPID_FIRE ? 200 : 500 // ms between shots

      if (currentTime - lastShootTime > fireRate) {
        // Fire projectile
        const shootPosition: [number, number, number] = [
          position.x + direction.x * 0.8,
          position.y + 0.5,
          position.z + direction.z * 0.8,
        ]

        addProjectile({
          position: shootPosition,
          direction: [direction.x, 0, direction.z],
          speed: 20,
          damage: 50,
          ownerId: 'player',
          color: currentWeapon === WeaponType.RAPID_FIRE ? '#ff0000' : '#00fff5',
        })

        setLastShootTime(currentTime)
      }
    }
  })

  return (
    <RigidBody
      ref={playerRef}
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
      lockRotations
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={powerUpActive ? '#ff6b00' : '#00fff5'}
          emissive={powerUpActive ? '#ff6b00' : '#00fff5'}
          emissiveIntensity={powerUpActive ? 0.5 : 0.1}
        />
      </mesh>
      {/* Visual indicator when powered up */}
      {powerUpActive && (
        <pointLight position={[0, 1, 0]} color="#ff6b00" intensity={2} distance={4} />
      )}
    </RigidBody>
  )
}

export default Player
