interface MainMenuProps {
  onStartGame: (mode: 'adventure' | 'multiplayer') => void
}

function MainMenu({ onStartGame }: MainMenuProps) {
  return (
    <div className="menu-overlay">
      <div className="menu-content">
        <h2>👻 GHOST MAZE 👻</h2>
        <p style={{ marginBottom: '30px', color: '#aaa' }}>
          Escape the maze. Collect the keys. Survive the ghosts.
        </p>
        <button
          className="menu-button"
          onClick={() => onStartGame('adventure')}
        >
          🎮 Adventure Mode
        </button>
        <button
          className="menu-button"
          onClick={() => onStartGame('multiplayer')}
        >
          👥 Multiplayer
        </button>
        <button className="menu-button" disabled style={{ opacity: 0.5 }}>
          🏪 Shop (Coming Soon)
        </button>
        <button className="menu-button" disabled style={{ opacity: 0.5 }}>
          ⚙️ Settings (Coming Soon)
        </button>
      </div>
    </div>
  )
}

export default MainMenu
