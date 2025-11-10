import { useState, useEffect, useMemo } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useGameStore } from '../stores/gameStore'
import { v4 as uuidv4 } from 'uuid'
import Pellet from './Pellet'
import Key from './Key'
import HealthPotion from './HealthPotion'
import Ghost from './Ghost'

interface MazeProps {
  level: number
}

// Simple maze layout (1 = wall, 0 = path)
const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// Key spawn positions (at dead ends and strategic locations)
const keySpawnPositions: [number, number][] = [
  [1, 1], // Top-left corner
  [8, 1], // Top-right corner
  [1, 8], // Bottom-left corner
  [7, 7], // Near bottom-right
]

// Ghost configurations with patrol routes
const ghostConfigs = [
  {
    id: 'ghost-red',
    color: '#ff00ff',
    initialPosition: [-6, 1, -6] as [number, number, number],
    patrolPoints: [
      [-6, 1, -6] as [number, number, number],
      [-6, 1, 6] as [number, number, number],
      [6, 1, 6] as [number, number, number],
      [6, 1, -6] as [number, number, number],
    ],
  },
  {
    id: 'ghost-blue',
    color: '#00ffff',
    initialPosition: [6, 1, -6] as [number, number, number],
    patrolPoints: [
      [6, 1, -6] as [number, number, number],
      [-6, 1, -6] as [number, number, number],
      [-6, 1, 6] as [number, number, number],
      [6, 1, 6] as [number, number, number],
    ],
  },
  {
    id: 'ghost-green',
    color: '#00ff00',
    initialPosition: [0, 1, 0] as [number, number, number],
    patrolPoints: [
      [0, 1, 0] as [number, number, number],
      [-4, 1, 0] as [number, number, number],
      [0, 1, 4] as [number, number, number],
      [4, 1, 0] as [number, number, number],
    ],
  },
]

function Maze({ level }: MazeProps) {
  const wallHeight = Math.min(2 + level * 0.5, 5)
  const collectPellet = useGameStore((state) => state.collectPellet)
  const collectKey = useGameStore((state) => state.collectKey)
  const healPlayer = useGameStore((state) => state.healPlayer)
  const playerStats = useGameStore((state) => state.playerStats)
  const updatePlayerStats = useGameStore((state) => state.updatePlayerStats)

  // Initialize collectibles
  const initialPellets = useMemo(() => {
    const pellets: { id: string; position: [number, number, number]; row: number; col: number }[] = []

    mazeLayout.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        // Place pellets in open spaces (not walls)
        if (cell === 0) {
          const x = (colIndex - mazeLayout[0].length / 2) * 2
          const z = (rowIndex - mazeLayout.length / 2) * 2
          pellets.push({
            id: uuidv4(),
            position: [x, 0.5, z],
            row: rowIndex,
            col: colIndex,
          })
        }
      })
    })

    // Update total pellets in store
    updatePlayerStats({ totalPellets: pellets.length })

    return pellets
  }, [level])

  const initialPotions = useMemo(() => {
    // Place 3-4 potions in strategic locations
    const potionPositions: [number, number][] = [
      [3, 3],
      [6, 3],
      [3, 6],
    ]

    return potionPositions.map(([row, col]) => {
      const x = (col - mazeLayout[0].length / 2) * 2
      const z = (row - mazeLayout.length / 2) * 2
      return {
        id: uuidv4(),
        position: [x, 0.5, z] as [number, number, number],
      }
    })
  }, [level])

  // State for active collectibles
  const [pellets, setPellets] = useState(initialPellets)
  const [keys, setKeys] = useState<{ id: string; position: [number, number, number] }[]>([])
  const [potions, setPotions] = useState(initialPotions)
  const [keysSpawned, setKeysSpawned] = useState(false)

  // Check if we should spawn keys (at 25% pellet collection)
  useEffect(() => {
    const collectionPercentage = (playerStats.pelletsCollected / playerStats.totalPellets) * 100

    if (collectionPercentage >= 25 && !keysSpawned) {
      // Spawn keys
      const newKeys = keySpawnPositions.map(([row, col]) => {
        const x = (col - mazeLayout[0].length / 2) * 2
        const z = (row - mazeLayout.length / 2) * 2
        return {
          id: uuidv4(),
          position: [x, 1, z] as [number, number, number],
        }
      })

      setKeys(newKeys)
      setKeysSpawned(true)
      updatePlayerStats({ totalKeys: newKeys.length })

      console.log('Keys spawned! 25% pellets collected.')
    }
  }, [playerStats.pelletsCollected, playerStats.totalPellets, keysSpawned])

  // Handle pellet collection
  const handlePelletCollect = (id: string) => {
    setPellets((prev) => prev.filter((p) => p.id !== id))
    collectPellet()
    console.log('Pellet collected!')
  }

  // Handle key collection
  const handleKeyCollect = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id))
    collectKey()
    console.log('Key collected!')
  }

  // Handle potion collection
  const handlePotionCollect = (id: string) => {
    setPotions((prev) => prev.filter((p) => p.id !== id))
    healPlayer(30) // Heal 30 HP
    console.log('Health potion collected! +30 HP')
  }

  return (
    <group>
      {/* Walls */}
      {mazeLayout.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === 1) {
            const x = (colIndex - mazeLayout[0].length / 2) * 2
            const z = (rowIndex - mazeLayout.length / 2) * 2
            return (
              <RigidBody
                key={`wall-${rowIndex}-${colIndex}`}
                type="fixed"
                position={[x, wallHeight / 2, z]}
              >
                <CuboidCollider args={[1, wallHeight / 2, 1]} />
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[2, wallHeight, 2]} />
                  <meshStandardMaterial
                    color="#4a5568"
                    roughness={0.8}
                    metalness={0.2}
                  />
                </mesh>
              </RigidBody>
            )
          }
          return null
        })
      )}

      {/* Pellets */}
      {pellets.map((pellet) => (
        <Pellet
          key={pellet.id}
          id={pellet.id}
          position={pellet.position}
          onCollect={handlePelletCollect}
        />
      ))}

      {/* Keys */}
      {keys.map((key) => (
        <Key
          key={key.id}
          id={key.id}
          position={key.position}
          onCollect={handleKeyCollect}
        />
      ))}

      {/* Health Potions */}
      {potions.map((potion) => (
        <HealthPotion
          key={potion.id}
          id={potion.id}
          position={potion.position}
          healAmount={30}
          onCollect={handlePotionCollect}
        />
      ))}

      {/* Ghosts */}
      {ghostConfigs.map((ghost) => (
        <Ghost
          key={ghost.id}
          id={ghost.id}
          initialPosition={ghost.initialPosition}
          color={ghost.color}
          patrolPoints={ghost.patrolPoints}
        />
      ))}
    </group>
  )
}

export default Maze
