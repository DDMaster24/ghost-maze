import { Physics } from '@react-three/rapier'
import { OrbitControls, Sky, Environment } from '@react-three/drei'
import { useGameStore } from '../stores/gameStore'
import Player from '../components/Player'
import Maze from '../components/Maze'
import Lighting from '../components/Lighting'

function GameScene() {
  const gameMode = useGameStore((state) => state.gameMode)

  return (
    <>
      {/* Lighting */}
      <Lighting />

      {/* Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="night" />

      {/* Physics World */}
      <Physics gravity={[0, -20, 0]}>
        {/* Player */}
        <Player />

        {/* Maze */}
        <Maze level={useGameStore.getState().playerStats.currentLevel} />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </Physics>

      {/* Debug Controls (remove in production) */}
      <OrbitControls makeDefault />
    </>
  )
}

export default GameScene
