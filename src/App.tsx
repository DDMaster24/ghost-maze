import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import GameScene from './scenes/GameScene'
import MainMenu from './components/MainMenu'
import HUD from './components/HUD'
import { useGameStore } from './stores/gameStore'

// Keyboard control mapping
export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
  sprint = 'sprint',
  interact = 'interact',
}

const controlsMap = [
  { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
  { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
  { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
  { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  { name: Controls.jump, keys: ['Space'] },
  { name: Controls.sprint, keys: ['ShiftLeft', 'ShiftRight'] },
  { name: Controls.interact, keys: ['KeyE'] },
]

function App() {
  const [showMenu, setShowMenu] = useState(true)
  const gameMode = useGameStore((state) => state.gameMode)

  const handleStartGame = (mode: 'adventure' | 'multiplayer') => {
    useGameStore.getState().setGameMode(mode)
    setShowMenu(false)
  }

  return (
    <>
      {showMenu ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <>
          <KeyboardControls map={controlsMap}>
            <Canvas
              shadows
              camera={{ position: [0, 5, 10], fov: 60 }}
              gl={{ antialias: true }}
            >
              <GameScene />
            </Canvas>
          </KeyboardControls>
          <HUD />
        </>
      )}
    </>
  )
}

export default App
