# Ghost Maze - Project Contract

**Last Updated:** 2025-11-10
**Status:** Planning Phase

## 🎮 Project Overview

Ghost Maze is a 3D RPG-style game inspired by classic Pac-Man, featuring modern mechanics, multiplayer capabilities, and a progression-based adventure mode.

## 🎯 Core Vision

- **NO Unity/Unreal** - Avoid royalty fees
- **3D RPG-Style Gameplay** - Immersive first/third-person perspective
- **Dual Game Modes** - Adventure (single-player) and Multiplayer
- **Monetization** - Dual currency system (in-game + premium)
- **Progressive Difficulty** - Adaptive challenge as players advance

---

## 🕹️ Game Mechanics

### Health & Survival System
- **Health bar** instead of traditional lives
- **Potions** for health restoration
- **Shop system** for purchasing items and upgrades

### Core Gameplay Loop
1. Navigate 3D maze environment
2. Collect pellets throughout the map
3. Find and collect keys/key fragments (spawn after collecting % of pellets)
4. Unlock exit door to escape the maze
5. Avoid or combat ghosts

### Power-Up System
- **NO traditional power pellets**
- **Weapon upgrades** (e.g., guns to shoot ghosts)
- **Temporary abilities** purchased from shop
- **Progressive unlocks** through adventure mode

---

## 🎲 Game Modes

### 1. Adventure Mode (Single-Player)
**Progression System:**
- Multiple levels with increasing difficulty
- Level 1: Easy, full visibility
- Higher levels: Reduced visibility, taller walls, no mini-map

**Difficulty Mechanics:**
- **Early Levels:** Full mini-map showing pellets, keys, and ghost locations
- **Advanced Levels:**
  - No mini-map
  - Raised wall heights (limited vision to current corridor)
  - Hidden ghost positions
  - Faster/smarter ghost AI

**Collectibles:**
- Pellets (primary objective)
- Keys/Key Fragments (unlock after collecting 25%+ of pellets)
- Gold Coins (in-game currency)
- Ghost Coins (premium currency - rare drops)

**Boss Battles:**
- Special encounters at milestone levels
- Unique mechanics per boss
- Special rewards upon defeat

### 2. Multiplayer Mode
**Local Lobby System:**
- One player = Main character (Pac-Man style)
- Other players = Ghosts (adversarial or co-op)

**Sub-Modes:**
- **Versus Mode:** Ghosts hunt the main character
- **Co-op Mode:** All players team up against AI ghosts/bosses
- **Boss Battle Co-op:** Tackle adventure mode bosses together

---

## 💰 Monetization & Economy

### Dual Currency System

#### Gold Coins (Earned In-Game)
- Dropped by defeated ghosts
- Found in maze exploration
- Rewards for level completion
- **Used For:**
  - Potions
  - Temporary upgrades
  - Adventure mode items
  - Shop purchases

#### Ghost Coins (Premium Currency)
- Rare drops in-game (very limited)
- Available for real money purchase
- **Used For:**
  - Cosmetic skins (character & ghost skins)
  - Custom maze maps
  - Exclusive visual effects
  - Battle pass / seasonal content

### Shop System
- Accessible between levels and in multiplayer lobbies
- Tiered items based on player progression
- No pay-to-win mechanics (cosmetics only for premium currency)

---

## 🎨 Visual & Design Direction

### Aesthetic
- 3D rendered environments
- Neon/cyberpunk or classic arcade aesthetic (TBD)
- Smooth character animations
- Particle effects for power-ups and combat

### Maze Design
- Procedurally generated elements for replayability
- Hand-crafted boss arenas
- Environmental hazards in higher levels
- Interactive elements (doors, switches, traps)

### Camera System
- Third-person perspective (default)
- First-person toggle option
- Dynamic camera for boss battles

---

## 🛠️ Technical Stack (RECOMMENDED)

### Frontend/Game Engine
- **Three.js** - 3D rendering engine (WebGL)
- **React** or **Vanilla TypeScript** - UI framework
- **Vite** - Build tool for fast development

### Backend Services
- **Supabase** (Pro subscription available)
  - Authentication & user management
  - PostgreSQL database for player data
  - Real-time features for multiplayer
  - Storage for game assets
  - Edge functions for game logic

### Hosting & Deployment
- **Vercel** (Pro subscription available)
  - Frontend hosting
  - Serverless API routes
  - CDN for global performance

### Multiplayer
- **Supabase Realtime** - WebSocket connections
- **Peer.js** (optional) - P2P for local lobby optimization

### Additional Libraries
- **Cannon.js** or **Rapier** - Physics engine
- **Howler.js** - Audio management
- **Zustand** or **Redux** - State management

### Payment Processing
- **Stripe** - Ghost Coins purchases
- **Supabase Edge Functions** - Payment webhook handling

---

## 📋 Development Phases

### Phase 1: Foundation (Current)
- [ ] Set up project structure
- [ ] Initialize Three.js scene
- [ ] Basic maze generation
- [ ] Player character controller
- [ ] Camera system

### Phase 2: Core Mechanics
- [ ] Player movement and collision
- [ ] Pellet collection system
- [ ] Key/fragment spawning logic
- [ ] Health and potion system
- [ ] Basic ghost AI

### Phase 3: Combat & Power-Ups
- [ ] Weapon system implementation
- [ ] Ghost combat mechanics
- [ ] Power-up effects
- [ ] Shop interface

### Phase 4: Adventure Mode
- [ ] Level progression system
- [ ] Difficulty scaling
- [ ] Mini-map and visibility controls
- [ ] Save/load functionality
- [ ] Boss battle framework

### Phase 5: Multiplayer
- [ ] Lobby system
- [ ] Player role assignment
- [ ] Real-time synchronization
- [ ] Co-op mode mechanics

### Phase 6: Monetization
- [ ] Currency systems implementation
- [ ] Shop UI and functionality
- [ ] Payment integration
- [ ] Cosmetics system

### Phase 7: Polish & Launch
- [ ] Audio and visual effects
- [ ] Performance optimization
- [ ] Mobile responsiveness (optional)
- [ ] Testing and bug fixes
- [ ] Deployment

---

## 🔒 Privacy & Security Notes

- **No Claude branding in commits** - Keep development process private
- **Proprietary game logic** - Protect unique mechanics
- **Secure payment handling** - PCI compliance through Stripe
- **Anti-cheat considerations** - Server-side validation for multiplayer

---

## 📊 Success Metrics

- Player retention rate
- Level completion rates
- Monetization conversion
- Multiplayer engagement
- Community feedback

---

## 🚀 Future Expansion Ideas

- Mobile app version (React Native)
- Steam/Epic Games Store release (Electron wrapper)
- Seasonal events and content
- Map editor for community creations
- Tournament/competitive mode
- Twitch integration for streaming

---

## 📝 Notes & Decisions Log

**2025-11-10:**
- Project initiated
- Tech stack selected (web-based approach)
- Leveraging Vercel Pro + Supabase Pro subscriptions
- Prioritizing rapid prototyping over custom engine development

---

*This document is living and will be updated as the project evolves.*
