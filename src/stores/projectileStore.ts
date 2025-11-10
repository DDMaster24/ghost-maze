import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export interface ProjectileData {
  id: string
  position: [number, number, number]
  direction: [number, number, number]
  speed: number
  damage: number
  ownerId: string
  color: string
}

interface ProjectileState {
  projectiles: ProjectileData[]
  addProjectile: (projectile: Omit<ProjectileData, 'id'>) => void
  removeProjectile: (id: string) => void
  clearProjectiles: () => void
}

export const useProjectileStore = create<ProjectileState>((set) => ({
  projectiles: [],

  addProjectile: (projectile) => {
    const id = uuidv4()
    const newProjectile = { ...projectile, id }

    set((state) => ({
      projectiles: [...state.projectiles, newProjectile],
    }))
  },

  removeProjectile: (id) =>
    set((state) => ({
      projectiles: state.projectiles.filter((p) => p.id !== id),
    })),

  clearProjectiles: () => set({ projectiles: [] }),
}))
