import { create } from 'zustand'

export type GameMode = 'adventure' | 'multiplayer' | null

interface PlayerStats {
  health: number
  maxHealth: number
  pelletsCollected: number
  totalPellets: number
  keysCollected: number
  totalKeys: number
  goldCoins: number
  ghostCoins: number
  currentLevel: number
}

interface GameState {
  // Game mode
  gameMode: GameMode
  setGameMode: (mode: GameMode) => void

  // Player stats
  playerStats: PlayerStats
  updatePlayerStats: (stats: Partial<PlayerStats>) => void
  damagePlayer: (amount: number) => void
  healPlayer: (amount: number) => void

  // Collectibles
  collectPellet: () => void
  collectKey: () => void
  collectGoldCoin: (amount: number) => void
  collectGhostCoin: (amount: number) => void

  // Game state
  isPaused: boolean
  togglePause: () => void

  // Level management
  loadLevel: (levelNumber: number) => void
  completeLevel: () => void

  // Reset
  resetGame: () => void
}

const initialPlayerStats: PlayerStats = {
  health: 100,
  maxHealth: 100,
  pelletsCollected: 0,
  totalPellets: 100,
  keysCollected: 0,
  totalKeys: 4,
  goldCoins: 0,
  ghostCoins: 0,
  currentLevel: 1,
}

export const useGameStore = create<GameState>((set) => ({
  // Game mode
  gameMode: null,
  setGameMode: (mode) => set({ gameMode: mode }),

  // Player stats
  playerStats: initialPlayerStats,

  updatePlayerStats: (stats) =>
    set((state) => ({
      playerStats: { ...state.playerStats, ...stats },
    })),

  damagePlayer: (amount) =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        health: Math.max(0, state.playerStats.health - amount),
      },
    })),

  healPlayer: (amount) =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        health: Math.min(
          state.playerStats.maxHealth,
          state.playerStats.health + amount
        ),
      },
    })),

  // Collectibles
  collectPellet: () =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        pelletsCollected: state.playerStats.pelletsCollected + 1,
      },
    })),

  collectKey: () =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        keysCollected: state.playerStats.keysCollected + 1,
      },
    })),

  collectGoldCoin: (amount) =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        goldCoins: state.playerStats.goldCoins + amount,
      },
    })),

  collectGhostCoin: (amount) =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        ghostCoins: state.playerStats.ghostCoins + amount,
      },
    })),

  // Game state
  isPaused: false,
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  // Level management
  loadLevel: (levelNumber) =>
    set((state) => ({
      playerStats: {
        ...initialPlayerStats,
        currentLevel: levelNumber,
        goldCoins: state.playerStats.goldCoins,
        ghostCoins: state.playerStats.ghostCoins,
      },
    })),

  completeLevel: () =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        currentLevel: state.playerStats.currentLevel + 1,
      },
    })),

  // Reset
  resetGame: () =>
    set({
      gameMode: null,
      playerStats: initialPlayerStats,
      isPaused: false,
    }),
}))
