# Tech Stack Decision Document

## Why Web-Based Over Custom Engine?

### The Reality of Custom Game Engines
Building a 3D game engine from scratch requires:
- **Rendering Pipeline:** OpenGL/Vulkan/DirectX expertise
- **Physics Engine:** Collision detection, rigid body dynamics
- **Audio System:** 3D spatial audio, mixing, streaming
- **Input Handling:** Keyboard, mouse, gamepad support
- **Networking:** Multiplayer synchronization
- **Asset Pipeline:** Model loading, texture compression, shaders
- **Platform Abstraction:** Windows, Mac, Linux compatibility
- **Estimated Time:** 2-3+ years for a small team

### Our Web-Based Approach Benefits

#### ✅ Zero Royalties
- Three.js: MIT License (completely free)
- No Unity/Unreal revenue share
- Own your code 100%

#### ✅ Leverage Your Pro Subscriptions
- **Vercel Pro:** Premium hosting, analytics, DDoS protection
- **Supabase Pro:** Database, auth, real-time, storage all included

#### ✅ Cross-Platform by Default
- Runs in any modern browser
- Desktop: Windows, Mac, Linux
- Mobile: iOS, Android (responsive design)
- No separate builds needed

#### ✅ Rapid Development
- Hot module replacement
- Modern tooling (TypeScript, Vite)
- Extensive npm ecosystem
- Get to market faster

#### ✅ Built-in Multiplayer Infrastructure
- WebSockets (Supabase Realtime)
- No need for dedicated game servers initially
- Scales automatically with Vercel

#### ✅ Easy Monetization
- Stripe integration (standard web payments)
- No app store fees (30% cut avoided)
- Direct customer relationship

#### ✅ Continuous Deployment
- Push updates instantly (no app store approval)
- A/B testing capabilities
- Real-time analytics

---

## Selected Tech Stack

### Core Game Engine
**Three.js** (MIT License)
- Industry standard for web 3D
- Excellent documentation
- Large community
- Performance optimized
- Used by: Google, Apple, NASA, Mozilla

### Physics
**Rapier** (Apache 2.0)
- Fast Rust-based physics engine
- WASM compilation for web
- Better performance than Cannon.js
- Active development

### Frontend Framework
**React 18+ with TypeScript**
- Component-based UI
- Strong typing for reliability
- Massive ecosystem
- Easy to find developers
- Vercel optimized

### Build Tool
**Vite**
- Lightning-fast HMR
- Optimized production builds
- Native ESM support
- Excellent Three.js integration

### Backend
**Supabase** (PostgreSQL + Edge Functions)
```
Features we'll use:
├── Authentication (social login, email, guest accounts)
├── PostgreSQL Database
│   ├── Player profiles
│   ├── Inventory & purchases
│   ├── Leaderboards
│   └── Game progress saves
├── Real-time Subscriptions (multiplayer game state)
├── Storage (user-generated content, replays)
├── Edge Functions (game logic validation)
└── Row Level Security (data protection)
```

### Hosting
**Vercel**
- Automatic HTTPS
- Global CDN
- Zero-config deployments
- Serverless functions for API routes
- Perfect React/Vite integration

### State Management
**Zustand**
- Lightweight (< 1KB)
- Simple API
- No boilerplate
- Perfect for game state

### Audio
**Howler.js**
- 3D spatial audio
- Auto-caching
- Sprite support
- Fallbacks for older browsers

### Payments
**Stripe**
- Industry standard
- Handles tax compliance
- Fraud prevention
- Recurring billing ready

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│           Player Browser (Client)            │
├─────────────────────────────────────────────┤
│  React UI Layer                              │
│  ├── Menus, HUD, Shop                        │
│  └── Game State (Zustand)                    │
├─────────────────────────────────────────────┤
│  Three.js Rendering Layer                    │
│  ├── Scene Management                        │
│  ├── 3D Models & Animations                  │
│  ├── Camera Controller                       │
│  └── Post-Processing Effects                 │
├─────────────────────────────────────────────┤
│  Game Logic Layer (TypeScript)               │
│  ├── Player Controller                       │
│  ├── Ghost AI                                │
│  ├── Collision Detection (Rapier)            │
│  ├── Collectible System                      │
│  └── Combat System                           │
└─────────────────────────────────────────────┘
                    ↕ HTTPS/WSS
┌─────────────────────────────────────────────┐
│         Vercel Edge Network (CDN)            │
│  ├── Static Assets (models, textures)        │
│  └── Serverless API Routes                   │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│           Supabase Backend                   │
│  ├── PostgreSQL (game data)                  │
│  ├── Realtime (multiplayer sync)             │
│  ├── Auth (user accounts)                    │
│  ├── Storage (saves, replays)                │
│  └── Edge Functions (anti-cheat logic)       │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│            Stripe (Payments)                 │
│  └── Ghost Coins Purchase Processing         │
└─────────────────────────────────────────────┘
```

---

## Performance Considerations

### Target Performance
- 60 FPS on desktop (1080p)
- 30-60 FPS on mobile devices
- < 3 second initial load time
- < 100ms multiplayer latency

### Optimization Strategies
1. **Asset Loading**
   - Lazy load 3D models
   - Texture compression (KTX2)
   - LOD (Level of Detail) for distant objects
   - Asset preloading for critical path

2. **Rendering**
   - Frustum culling (don't render what's not visible)
   - Instanced rendering for repeated objects (pellets)
   - Efficient shader management
   - Post-processing budget

3. **Network**
   - Delta compression for game state
   - Client-side prediction
   - Server reconciliation
   - Bandwidth throttling options

4. **Code Splitting**
   - Route-based chunking
   - Dynamic imports for game modes
   - Service worker for offline caching

---

## Security & Anti-Cheat

### Client-Side
- Obfuscated production builds
- No sensitive logic in client code
- Input validation

### Server-Side (Supabase Edge Functions)
- Score validation
- Purchase verification
- Movement speed checks
- Impossible action detection
- Rate limiting

### Database
- Row Level Security policies
- Encrypted sensitive data
- Audit logs for purchases
- Automated backups

---

## Development Workflow

```bash
# Local Development
npm run dev              # Start dev server (hot reload)
npm run test             # Run unit tests
npm run lint             # Check code quality
npm run build            # Production build
npm run preview          # Test production build

# Deployment (automatic)
git push origin main     # Auto-deploys to Vercel
```

### CI/CD Pipeline (Future)
- Automated testing on PR
- Lighthouse performance checks
- Bundle size monitoring
- Automatic preview deployments

---

## Scalability Path

### Initial Launch
- Vercel Pro: ~1000 concurrent players
- Supabase Pro: ~500 realtime connections

### Growth Scaling
1. **Upgrade to Enterprise Plans**
   - Vercel Enterprise: Unlimited bandwidth
   - Supabase Enterprise: Custom infrastructure

2. **Add Caching Layer**
   - Redis for session data
   - CloudFlare for CDN

3. **Dedicated Game Servers** (if needed)
   - Hetzner/DigitalOcean for real-time game rooms
   - Keep Supabase for persistent data

4. **Geographic Distribution**
   - Regional game servers
   - Edge computing for low latency

---

## Alternative Considered: Godot

### Why NOT Godot (for now)
- ✗ Desktop-only initial target (web export is experimental)
- ✗ Can't leverage Vercel/Supabase investments
- ✗ Requires separate backend infrastructure
- ✗ Multiplayer networking more complex
- ✗ Distribution via Steam/Epic requires fees
- ✗ Slower iteration cycle

### When to Consider Godot
- If web performance becomes limiting
- If targeting console releases (PS5, Xbox)
- If native desktop apps are strongly preferred

---

## Decision: WEB-BASED with Three.js

**Rationale:**
1. Fastest path to MVP
2. Zero royalties forever
3. Uses your existing Pro subscriptions
4. Cross-platform without extra work
5. Can always port to native later if needed
6. Better monetization control

**Next Steps:**
1. Initialize project with Vite + React + TypeScript
2. Set up Three.js basic scene
3. Integrate Supabase
4. Create player controller
5. Build first maze prototype

---

*This decision can be revisited, but we should commit to it for the prototype phase.*
