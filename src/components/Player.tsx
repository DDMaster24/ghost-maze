import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { useKeyboardControls } from '@react-three/drei'
import { Controls } from '../App'
import * as THREE from 'three'

function Player() {
  const playerRef = useRef<any>(null)
  const [, get] = useKeyboardControls<Controls>()

  useFrame((state, delta) => {
    if (!playerRef.current) return

    const { forward, back, left, right, jump, sprint } = get()

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

    // Camera follow
    const position = playerRef.current.translation()
    state.camera.position.lerp(
      new THREE.Vector3(position.x, position.y + 5, position.z + 10),
      0.1
    )
    state.camera.lookAt(position.x, position.y, position.z)
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
        <meshStandardMaterial color="#00fff5" />
      </mesh>
    </RigidBody>
  )
}

export default Player
