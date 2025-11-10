import { useEffect, useState } from 'react'
import { useGameStore } from '../stores/gameStore'

function DamageOverlay() {
  const playerHealth = useGameStore((state) => state.playerStats.health)
  const [lastHealth, setLastHealth] = useState(playerHealth)
  const [showDamage, setShowDamage] = useState(false)

  useEffect(() => {
    if (playerHealth < lastHealth) {
      // Player took damage
      setShowDamage(true)
      setTimeout(() => setShowDamage(false), 200)
    }
    setLastHealth(playerHealth)
  }, [playerHealth, lastHealth])

  if (!showDamage) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 0, 0, 0.3)',
        pointerEvents: 'none',
        zIndex: 999,
        animation: 'damagePulse 0.2s ease-out',
      }}
    />
  )
}

export default DamageOverlay
