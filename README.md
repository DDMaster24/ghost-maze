# 👻 Ghost Maze

A 3D RPG-style game inspired by Pac-Man, featuring multiplayer capabilities and an immersive adventure mode.

## 🎮 Game Overview

Ghost Maze is a modern take on the classic arcade experience, built with cutting-edge web technologies. Navigate through 3D mazes, collect pellets and keys, upgrade your abilities, and survive against intelligent ghost AI.

### Key Features

- **3D Immersive Gameplay** - First/third-person perspective maze exploration
- **Adventure Mode** - Progressive difficulty across multiple levels
- **Multiplayer Mode** - Local lobby system with versus and co-op gameplay
- **Boss Battles** - Epic encounters with unique mechanics
- **Dual Currency System** - Earn gold in-game, purchase premium content
- **Shop System** - Buy potions, upgrades, and cosmetics
- **Health & Combat** - Dynamic health system with weapon power-ups

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **3D Engine:** Three.js + React Three Fiber
- **Physics:** Rapier (Rust-based physics engine via WASM)
- **State Management:** Zustand
- **Build Tool:** Vite
- **Backend:** Supabase (Auth, Database, Realtime, Storage)
- **Hosting:** Vercel
- **Audio:** Howler.js

### Why This Stack?

- ✅ **Zero royalties** (no Unity/Unreal fees)
- ✅ **Cross-platform** (works on desktop, mobile, tablets)
- ✅ **Fast development** (hot module replacement, modern tooling)
- ✅ **Scalable infrastructure** (Vercel + Supabase Pro)
- ✅ **Easy updates** (no app store approval needed)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 Game Modes

### Adventure Mode
- **Single-player progression** through increasingly difficult levels
- **Collectibles:** Pellets, keys, gold coins, ghost coins
- **Dynamic difficulty:** Levels introduce taller walls, remove mini-maps, add environmental hazards
- **Boss encounters:** Special battles at milestone levels

### Multiplayer Mode
- **Local lobby system** with role assignment
- **Versus Mode:** One player vs ghost players
- **Co-op Mode:** Team up against AI ghosts and bosses

## 🕹️ Controls

- **WASD / Arrow Keys** - Move
- **Space** - Jump
- **Shift** - Sprint
- **E** - Interact
- **ESC** - Pause menu

## 📁 Project Structure

```
ghost-maze/
├── .claude/                  # Project documentation
│   ├── project-contract.md   # Full game design document
│   └── tech-stack-decision.md
├── src/
│   ├── components/           # React components
│   │   ├── Player.tsx
│   │   ├── Maze.tsx
│   │   ├── MainMenu.tsx
│   │   ├── HUD.tsx
│   │   └── Lighting.tsx
│   ├── scenes/               # 3D scenes
│   │   └── GameScene.tsx
│   ├── stores/               # State management
│   │   └── gameStore.ts
│   ├── systems/              # Game systems (AI, physics, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript definitions
│   ├── utils/                # Utilities
│   ├── assets/               # 3D models, textures, audio
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup
- [x] Basic Three.js scene
- [x] Player controller
- [x] Simple maze generation
- [x] HUD and menu system

### Phase 2: Core Mechanics (Current)
- [ ] Collision and pellet collection
- [ ] Key spawning system
- [ ] Health and potion mechanics
- [ ] Basic ghost AI

### Phase 3: Combat & Power-Ups
- [ ] Weapon system
- [ ] Ghost combat
- [ ] Shop interface

### Phase 4: Adventure Mode
- [ ] Level progression
- [ ] Save/load system
- [ ] Boss battles

### Phase 5: Multiplayer
- [ ] Supabase Realtime integration
- [ ] Lobby system
- [ ] Role assignment

### Phase 6: Monetization
- [ ] Currency systems
- [ ] Shop UI
- [ ] Stripe integration

### Phase 7: Polish & Launch
- [ ] Audio and VFX
- [ ] Performance optimization
- [ ] Testing and deployment

## 💰 Monetization

### Gold Coins (In-Game Currency)
Earned through gameplay:
- Defeating ghosts
- Completing levels
- Exploration bonuses

Used for:
- Health potions
- Temporary upgrades
- Adventure mode items

### Ghost Coins (Premium Currency)
Acquired through:
- Rare in-game drops
- Real money purchases (Stripe)

Used for:
- Cosmetic skins
- Custom maps
- Exclusive visual effects

## 🔒 Privacy & Security

- Server-side validation for game logic
- Secure payment processing via Stripe
- Row Level Security in Supabase
- No pay-to-win mechanics

## 📊 Performance Targets

- **60 FPS** on desktop (1080p)
- **30-60 FPS** on mobile devices
- **< 3 seconds** initial load time
- **< 100ms** multiplayer latency

## 🤝 Contributing

This is a private project. All development decisions are documented in `.claude/project-contract.md`.

## 📄 License

Proprietary - All rights reserved

## 🎯 Vision

Ghost Maze aims to bring the nostalgic fun of classic arcade games into the modern era with:
- Stunning 3D graphics
- Engaging multiplayer experiences
- Fair monetization (cosmetics only)
- Regular content updates
- Cross-platform accessibility

---

**Built with passion. Powered by web technologies. No royalties. 100% ownership.**
