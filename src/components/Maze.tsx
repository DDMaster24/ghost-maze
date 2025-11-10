import { RigidBody, CuboidCollider } from '@react-three/rapier'

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

function Maze({ level }: MazeProps) {
  const wallHeight = Math.min(2 + level * 0.5, 5) // Walls get taller with level

  return (
    <group>
      {mazeLayout.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === 1) {
            const x = (colIndex - mazeLayout[0].length / 2) * 2
            const z = (rowIndex - mazeLayout.length / 2) * 2
            return (
              <RigidBody
                key={`${rowIndex}-${colIndex}`}
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

      {/* Pellets (temporary visualization) */}
      {mazeLayout.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === 0 && rowIndex % 2 === 0 && colIndex % 2 === 0) {
            const x = (colIndex - mazeLayout[0].length / 2) * 2
            const z = (rowIndex - mazeLayout.length / 2) * 2
            return (
              <mesh
                key={`pellet-${rowIndex}-${colIndex}`}
                position={[x, 0.5, z]}
              >
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color="#ffd700"
                  emissive="#ffd700"
                  emissiveIntensity={0.5}
                />
              </mesh>
            )
          }
          return null
        })
      )}
    </group>
  )
}

export default Maze
