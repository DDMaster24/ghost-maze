import { create } from 'zustand'
import { WeaponType } from '../types/game'

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
  score: number
  ghostsDefeated: number
}

interface GameState {
  // Game mode
  gameMode: GameMode
  setGameMode: (mode: GameMode) => void

  // Player position tracking
  playerPosition: [number, number, number] | null
  setPlayerPosition: (position: [number, number, number]) => void

  // Player stats
  playerStats: PlayerStats
  updatePlayerStats: (stats: Partial<PlayerStats>) => void
  damagePlayer: (amount: number) => void
  healPlayer: (amount: number) => void
  addScore: (points: number) => void
  incrementGhostsDefeated: () => void

  // Collectibles
  collectPellet: () => void
  collectKey: () => void
  collectGoldCoin: (amount: number) => void
  collectGhostCoin: (amount: number) => void

  // Weapon/Power-up system
  currentWeapon: WeaponType
  powerUpActive: boolean
  powerUpEndTime: number | null
  activatePowerUp: (weapon: WeaponType, duration: number) => void
  deactivatePowerUp: () => void
  setWeapon: (weapon: WeaponType) => void

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
  score: 0,
  ghostsDefeated: 0,
}

export const useGameStore = create<GameState>((set) => ({
  // Game mode
  gameMode: null,
  setGameMode: (mode) => set({ gameMode: mode }),

  // Player position
  playerPosition: null,
  setPlayerPosition: (position) => set({ playerPosition: position }),

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

  addScore: (points) =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        score: state.playerStats.score + points,
      },
    })),

  incrementGhostsDefeated: () =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        ghostsDefeated: state.playerStats.ghostsDefeated + 1,
      },
    })),

  // Collectibles
  collectPellet: () =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        pelletsCollected: state.playerStats.pelletsCollected + 1,
        score: state.playerStats.score + 10,
      },
    })),

  collectKey: () =>
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        keysCollected: state.playerStats.keysCollected + 1,
        score: state.playerStats.score + 100,
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

  // Weapon/Power-up system
  currentWeapon: WeaponType.NONE,
  powerUpActive: false,
  powerUpEndTime: null,

  activatePowerUp: (weapon, duration) => {
    const endTime = Date.now() + duration * 1000
    set({
      currentWeapon: weapon,
      powerUpActive: true,
      powerUpEndTime: endTime,
    })
  },

  deactivatePowerUp: () =>
    set({
      currentWeapon: WeaponType.NONE,
      powerUpActive: false,
      powerUpEndTime: null,
    }),

  setWeapon: (weapon) => set({ currentWeapon: weapon }),

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
