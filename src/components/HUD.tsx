import { useGameStore } from '../stores/gameStore'

function HUD() {
  const playerStats = useGameStore((state) => state.playerStats)

  const healthPercentage = (playerStats.health / playerStats.maxHealth) * 100
  const pelletProgress = (playerStats.pelletsCollected / playerStats.totalPellets) * 100

  return (
    <div className="hud-overlay">
      {/* Health Bar */}
      <div className="health-bar">
        <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
          <span>Health</span>
          <span>{playerStats.health} / {playerStats.maxHealth}</span>
        </div>
        <div style={{ width: '100%', background: '#333', borderRadius: '5px' }}>
          <div
            className="health-bar-fill"
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      </div>

      {/* Score & Stats */}
      <div className="score-display">
        <div>Level {playerStats.currentLevel}</div>
        <div style={{ fontSize: '1rem', marginTop: '10px' }}>
          <div>Pellets: {playerStats.pelletsCollected}/{playerStats.totalPellets}</div>
          <div>Keys: {playerStats.keysCollected}/{playerStats.totalKeys}</div>
        </div>
        <div style={{ fontSize: '1rem', marginTop: '10px', borderTop: '1px solid #ffd700', paddingTop: '10px' }}>
          <div>💰 Gold: {playerStats.goldCoins}</div>
          <div>👻 Ghost Coins: {playerStats.ghostCoins}</div>
        </div>
      </div>

      {/* Progress Bar for Pellets */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        background: 'rgba(0, 0, 0, 0.7)',
        border: '2px solid #00fff5',
        borderRadius: '10px',
        padding: '10px',
      }}>
        <div style={{ marginBottom: '5px', textAlign: 'center' }}>
          Collection Progress
        </div>
        <div style={{ width: '100%', background: '#333', borderRadius: '5px', height: '15px' }}>
          <div
            style={{
              width: `${pelletProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00fff5 0%, #00d4ff 100%)',
              borderRadius: '5px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Controls Info */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        border: '2px solid #666',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '0.8rem',
      }}>
        <div><strong>Controls:</strong></div>
        <div>WASD / Arrows - Move</div>
        <div>Space - Jump</div>
        <div>Shift - Sprint</div>
        <div>E - Interact</div>
        <div>ESC - Pause</div>
      </div>
    </div>
  )
}

export default HUD
