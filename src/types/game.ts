// Collectible types
export enum CollectibleType {
  PELLET = 'pellet',
  KEY = 'key',
  KEY_FRAGMENT = 'key_fragment',
  GOLD_COIN = 'gold_coin',
  GHOST_COIN = 'ghost_coin',
  HEALTH_POTION = 'health_potion',
  POWER_UP = 'power_up',
}

// Collectible interface
export interface Collectible {
  id: string
  type: CollectibleType
  position: [number, number, number]
  value: number
  collected: boolean
}

// Ghost AI states
export enum GhostState {
  PATROL = 'patrol',
  CHASE = 'chase',
  FLEE = 'flee',
  DEAD = 'dead',
}

// Ghost interface
export interface Ghost {
  id: string
  position: [number, number, number]
  state: GhostState
  health: number
  speed: number
  color: string
}

// Player state
export interface PlayerState {
  position: [number, number, number]
  velocity: [number, number, number]
  health: number
  isDead: boolean
}

// Level configuration
export interface LevelConfig {
  levelNumber: number
  mazeLayout: number[][]
  totalPellets: number
  totalKeys: number
  wallHeight: number
  ghostCount: number
  showMinimap: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}
