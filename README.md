# ScoreCard 34518 Prompt Pack

Final title: **ScoreCard 34518: Uncle’s Cheeseborger War**

I corrected the main compatibility issue by making Spirits and Hunters a lightweight real-time battlefield ecology layered over a turn-based artillery game, not a second RPG combat system. That preserves the Scorched-Earth-style core while still using the Spirit Hunter bureau/spirit material: five bureaus with rival explanations, moving spirits, taming/capturing concepts, cooldown-like timers, and autonomous spirit behavior.

Copy this full prompt into Codex:

```text
Build a complete playable browser game called:

SCORECARD 34518: UNCLE’S CHEESEBORGER WAR

Build it in one self-contained Vite + TypeScript + HTML5 Canvas project.

Do not copy copyrighted titles, art, sprites, UI text, music, sound effects, logos, or exact branding from any existing game. The game may be inspired by classic 1990s turn-based artillery tank games, but all assets, names, visuals, UI, and mechanics must be original.

PROJECT REQUIREMENTS

Technology:
- TypeScript
- Vite
- HTML5 Canvas
- Web Audio API
- No external art assets
- No external sound assets
- No server
- Must run with:
  - npm install
  - npm run dev

Deliver:
- package.json
- index.html
- src/main.ts
- all needed src modules
- clean modular architecture
- procedural rendering
- procedural audio

Core genre:
A retro-futurist, turn-based, side-view artillery tank game with destructible terrain, wind, gravity, shops, weird weapons, AI tanks, moving Spirits/Hunters, and a procedural sound system.

CORE CONCEPT

A perfect post-scarcity society was promised.

Uncle Rob’s robots gave the world forcefields, clean power, automated labor, public safety, burger abundance, and a slogan:

“A FUTURE FREE OF SORROWS.”

But because the system measured the wrong things, it did not eliminate conflict. It converted every unsolved human problem into a weapon.

Money became a story.
Burgers became currency.
Forcefields became policy.
Public spaces became battlefields.
Spirits became audit errors.
Hunters became field bureaucrats.
The ScoreCard kept saying everything was fine.

The game takes place inside a broken civic planning arcade cabinet called SCORECARD 34518. It was built to prove that Uncle Rob’s society had solved scarcity, exclusion, loneliness, hunger, public disorder, and economic anxiety. Instead, it became a tank war over who gets to define the future.

TONE

The tone should be:
- absurd
- satirical
- retro-computer flavored
- grotesque but cartoonish
- bureaucratic
- strangely warm in flashes
- surreal
- mechanically clear
- funny without becoming incoherent

The game is not realistic violence. It is cartoon tank combat involving fictional machines, spirits, robots, burgers, money, forcefields, and civic dashboards.

Important tone rule:
Do not make fatness itself the punishment. The joke is the insane cheeseburger economy, the weaponization of abundance, and the ridiculous civic machinery. Big fat guys should be powerful, funny, formidable, and confident.

Avoid:
- realistic food tampering instructions
- realistic human force-feeding harm
- medical realism
- sexual framing
- gore
- hate-based humor

Use “cheeseburger” and “cheeseborger.” “Cheeseborger” should appear in weapon names, UI copy, status effects, and jokes.

GAME FLOW

1. Start Screen
2. Match Setup
3. Civic Audit Round Intro
4. Turn-based artillery battle
5. Round Summary
6. Redistribution Screen / Shop
7. Next round
8. First tank to 3 round wins wins the match
9. Match Winner / Ending Screen
10. Restart Match / New Game

Match setup options:
- Human players: 1–4
- AI players: 1–6
- Terrain / Civic Audit Zone:
  - Food Court Ruins
  - Cheesetopia Commons
  - Library of Last Refuge
  - Bowling Alley of Belonging
  - Robot Orchard
  - Black Forest Restaurant
  - Arcade Bunker
  - Drive-Thru Parliament
- Wind / Market Volatility:
  - Still Air
  - Mild Volatility
  - Weird Weather
- Economy:
  - Allowance
  - Inheritance
  - Post-Money Confusion
- Field Ecology:
  - Off
  - Light
  - Standard
  - Chaos
- Starting Uncle Money:
  - Low
  - Normal
  - High

CORE ARTILLERY GAMEPLAY

Battlefield:
- Side-view 2D terrain generated as a heightmap.
- Terrain must be destructible.
- Explosions remove circular chunks from terrain.
- Some weapons add terrain.
- Some weapons create slicks, cheese pools, forcefield platforms, or soft bun structures.
- Tanks sit on terrain.
- Tanks fall when terrain beneath them is destroyed.
- Tanks take fall damage from large drops.
- Tanks can be buried in dirt, bun, cheese, or debris.
- Tanks can be eliminated.

Turn system:
- Turn-based tank combat.
- Only the active tank can aim/fire.
- Spirits and Hunters continue moving during aiming, projectile flight, and explosion aftermath.
- Spirits and Hunters pause during menus, shops, pause screen, and round summaries.
- Current player controls:
  - angle
  - power
  - weapon
  - utility
  - fire
- Hot-seat local multiplayer must work.
- AI players act automatically.

Projectile physics:
- Simulate gravity.
- Wind / Market Volatility affects horizontal velocity.
- Projectiles leave visible trails.
- Projectiles can collide with:
  - terrain
  - tanks
  - forcefields
  - Spirits
  - Hunters
  - temporary platforms
  - world bounds
- Camera follows projectile while in flight.
- After impact:
  - explosion animation
  - damage
  - terrain deformation
  - particles
  - sound
  - floating combat text
  - ScoreCard metric changes

Victory:
- Last surviving tank wins round.
- First tank to 3 round wins wins match.
- Match victory is framed as “temporary control of the civic narrative,” not saving the world.

MAIN UI VOCABULARY

Use these labels:
- Health = Remaining Dignity
- Cash = Uncle Money
- Wind = Market Volatility
- Shop = Redistribution Screen
- Round = Civic Audit
- Round Summary = Minutes from the Committee
- Winner Screen = Future Secured, Temporarily
- Pause Menu = No Continue Screens
- Extra burger/weight stat = Cheeseborger Mass
- Global warning stat = Sorrows Detected

Each tank tracks:
- Remaining Dignity
- Uncle Money
- Cheeseborger Mass
- Belonging
- Liquidity
- Sorrows Detected
- Civic Heat
- Shield status
- Round wins

Global ScoreCard tracks:
- Public Trust
- Third Place Integrity
- Burger Inflation
- Forcefield Compliance
- Robot Confidence
- Adulterant Risk
- Nostalgia Pressure
- Market Volatility
- Sorrows Detected

These metrics do not all need deep simulation, but they must affect:
- UI
- round summaries
- shop flavor
- some prices
- some map events
- some announcer lines

VISUAL STYLE

Retro 1990s shareware artillery style with modern readability.

Draw everything procedurally:
- tanks
- terrain
- projectiles
- explosions
- particles
- spirits
- hunters
- robots
- UI windows
- shields
- burger debris
- money debris
- forcefield platforms
- map props

Visual motifs:
- old software windows
- civic dashboards
- fake government forms
- arcade cabinet errors
- neon-free retro signage
- receipts
- paper money
- coins
- shredded forms
- cheese layers
- buns
- ketchup slicks
- mayo fog
- pickle slices
- forcefield domes
- robots with trays/clipboards
- little background big fat guys in hoverchairs, grill rigs, or bleachers

Map visual logic:
Every battlefield is a destroyed or weaponized third place.

Map families:

1. Food Court Ruins
- abandoned mall
- cracked tile
- burger stall
- chicken counter
- empty tables
- soda machines
- fryer pits
- arcade entrance

2. Cheesetopia Commons
- childlike cheese town corrupted into artillery infrastructure
- pizza-shop warmth
- mascot statues
- cheese rivers
- rainbow syrup runoff

3. Library of Last Refuge
- public computers
- book stacks
- microfilm machines
- scanner desks
- quiet public sanctuary turned battlefield

4. Bowling Alley of Belonging
- bowling lanes as ramps
- pins as destructible props
- ball returns as launchers
- league-night signage

5. Robot Orchard
- clean power pylons
- synthetic hills
- robot towers
- forcefield bridges
- perfect lawns

6. Black Forest Restaurant
- surreal indoor/outdoor luxury environment
- warm lanterns
- curved glass
- black forest skyline
- artificial moon
- city lights

7. Arcade Bunker
- CGA-ish backgrounds
- broken cabinets
- CRT glow
- ticket counters
- exposed wires
- ERROR 34518 signs

8. Drive-Thru Parliament
- menu boards
- pneumatic tubes
- speaker boxes
- order windows
- grill chambers
- condiment reservoirs

FACTIONS

Generate tanks from faction pools. Factions represent social forces.

Faction categories:
- The Heirs
- The Regulars
- The Franchise Lords
- The Forcefield Bureau
- The ScoreCard Reformers
- The Adulterant Guild
- Big Fat Guys Local 777
- The Yesterday Preservation Society
- The Tomorrow Trust
- The Cheesetopia Children

[... content unchanged from prompt ...]

FINAL DESIGN RULE

Every feature should answer at least one of these:
- What did the perfect system fail to understand?
- What did money turn into?
- What did the burger economy replace?
- Who gets to belong here?
- What does the ScoreCard measure incorrectly?
- What does Yesterday refuse to release?
- What does Today fail to afford?
- What does Tomorrow hide behind forcefields?
```
