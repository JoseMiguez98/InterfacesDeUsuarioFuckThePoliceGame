# CLAUDE.md — InterfacesDeUsuarioFuckThePoliceGame

## Project Overview

**Fuck the Police!** is a browser-based top-down car dodge game. The player controls a black sports car and must avoid incoming police and emergency vehicles to survive as long as possible. Score increases by 5 points every second.

- **Tech stack**: HTML5, CSS3, ES5 vanilla JavaScript, jQuery 3.3.1 (CDN)
- **No build system** — open `index.html` directly in a browser
- **No package manager** — jQuery is loaded from `https://code.jquery.com`
- **No test framework** — manual testing only
- **Fixed layout**: 1250×1000 px container, not responsive

## How to Run

```bash
# Just open the file in a browser — no server or build step required
open index.html        # macOS
xdg-open index.html    # Linux
# Or use a simple HTTP server to avoid CORS issues with file:// URLs:
python3 -m http.server 8080
```

Navigate to `index.html` and click **Jugar** to start.

## Repository Structure

```
index.html                      # Single-page entry point; loads all CSS & JS
css/
  style.css                     # Global layout, absolute positioning
  gameContainer.css             # Game-specific styles and sprite animations
js/
  InputManager.js               # Tracks which keys are currently held down
  ScoreManager.js               # Score counter (+5 per second via setInterval)
  ActionsManager.js             # Maps key names → player method call strings
  Enemie.js                     # Enemy vehicle: spawn, move, collision detection
  Player.js                     # Player vehicle: movement with boundary checks
  Game.js                       # Game loop (requestAnimationFrame), init, buttons
img/
  background/1.png              # Road texture for scrolling background animation
  cars/resized/
    black_viper.png             # Player sprite
    police.png                  # Enemy police car sprite
    ambulance.png               # Enemy ambulance sprite
    taxi.png                    # Enemy taxi sprite
    truck.png                   # Enemy truck sprite
    police_animation/
      police_sheet.png          # Sprite sheet for animated police car
  controls/
    wasd.png                    # WASD keys graphic shown in UI
    arrowKeys.png               # Arrow keys graphic shown in UI
  cover/
    cover.jpg                   # Game cover art
    text.png                    # Title text overlay
  explosion/
    explosion.png               # 52-frame explosion sprite sheet
  rate/
    rate.png                    # Rating stars graphic
```

## Script Load Order (Critical)

There is **no module system**. Scripts are loaded as plain `<script>` tags in `index.html` and must appear in dependency order. The current order is:

1. `InputManager.js` — no dependencies
2. `ScoreManager.js` — no dependencies
3. `ActionsManager.js` — no dependencies
4. `Enemie.js` — depends on jQuery being present
5. `Player.js` — depends on jQuery being present
6. `Game.js` — depends on all of the above

When adding a new JS file, insert the `<script>` tag before `Game.js` and after any files it depends on.

## Architecture

### Class System (ES5 Prototypal OOP)

All classes use ES5 constructor functions with prototype methods — no `class` keyword is used:

```javascript
function MyClass(arg) {
  this.property = arg;
}

MyClass.prototype.myMethod = function() { ... };
```

### Classes and Responsibilities

| Class | File | Responsibility |
|---|---|---|
| `InputManager` | `js/InputManager.js` | Maintains `keysDown` object tracking which of the 8 supported keys are currently pressed |
| `ScoreManager` | `js/ScoreManager.js` | Holds score integer; `start()` adds 5 via `setInterval(1000)`; `restart()` resets to 0 |
| `ActionsManager` | `js/ActionsManager.js` | Maps key names (e.g. `"w"`, `"ArrowUp"`) to action strings (e.g. `"player.moveUp()"`) |
| `Enemie` | `js/Enemie.js` | Each enemy vehicle: random x-position, random speed (3–7 px/frame), moves top-to-bottom, respawns when off-screen |
| `Player` | `js/Player.js` | Player vehicle: 4-directional movement with road boundary enforcement; CSS rotation on left/right |
| *(game module)* | `js/Game.js` | Instantiates all objects, runs `requestAnimationFrame` game loop, wires up Play/Restart buttons |

### Game Loop

The main loop is `update()` in `Game.js`, driven by `window.requestAnimationFrame`:

```
requestAnimationFrame → update()
  ├─ If player alive:
  │    ├─ For each pressed key → eval(actionsManager.getAction(key))   // moves player
  │    └─ Update score display in DOM
  ├─ For each enemy:
  │    ├─ enemy.move()                                                  // reposition enemy
  │    └─ If collisionPlayer() → gameOver(), player.alive = false
  └─ requestAnimationFrame → update()   // schedule next frame
```

### Input Pipeline

```
keydown/keyup events
  → InputManager.setKeyPressed(key, bool)   // updates keysDown dict
  → Game loop reads keysDown
  → ActionsManager.getAction(key)           // returns action string
  → eval(actionString)                      // executes player method
```

Supported keys: `w a s d ArrowUp ArrowDown ArrowLeft ArrowRight`

### Collision Detection

AABB (axis-aligned bounding box) via `getBoundingClientRect()` in `Enemie.prototype.collisionPlayer`:

```javascript
let dx = enm_rect.width - 60;   // horizontal tolerance (hardcoded)
let dy = enm_rect.height - 10;  // vertical tolerance (hardcoded)
return Math.abs(enm_rect.x - elm_rect.x) < dx && Math.abs(enm_rect.y - elm_rect.y) < dy;
```

### Animation System

Animations are CSS-driven using sprite sheets and `@keyframes`:

- **Road background**: `roadAnim` class applies a looping `background-position` animation (7s)
- **Police cars**: `police_sheet.png` cycled via CSS animation steps (2s)
- **Explosion**: 52-frame `explosion.png` sheet triggered by adding class `explosion` to `.player`; class is removed on `animationend`

## Code Conventions

### Naming
- **Constructor functions**: PascalCase (`Player`, `Enemie`, `InputManager`)
- **Methods and properties**: camelCase (`moveRight`, `xOffset`, `isAlive`)
- **CSS class names**: hyphenated (`road-limit` style, but existing code uses `.roadLimit`, `.enemie`, `.scoreBox`)
- **HTML IDs**: camelCase (`#principalContainer`, `#playButton`, `#coverImg`)

### DOM Manipulation
All DOM reads and writes use **jQuery** — do not mix in `document.querySelector` or vanilla DOM APIs:

```javascript
// Correct
$(".player").css("left", this.xOffset + "px");
let w = parseInt($(".roadLimit").css("width"));

// Avoid mixing styles — pick one
```

### Positions
All positions are stored as integers (pixels) and applied as strings:

```javascript
this.xOffset += this.speed;
$(".player").css("left", this.xOffset + "px");
```

## Known Gotchas

### `eval()` in the game loop
`Game.js:19` uses `eval()` to dispatch player actions:

```javascript
eval(actionsManager.getAction(key));   // e.g. eval("player.moveUp()")
```

This is intentional and tightly scoped — `actionsManager` only returns predefined strings from its internal map. Do not refactor this to a direct method call without updating `ActionsManager` to return function references instead of strings.

### `Enemie` spelling
The class is spelled `Enemie` (with `ie`, not `y`) throughout all files, CSS, and HTML. **Match this spelling exactly** when referencing the class or its CSS selector (`.enemie`).

### Hardcoded magic numbers
The codebase contains hardcoded values that need to stay in sync:

| Location | Value | Meaning |
|---|---|---|
| `Player.js:52` | `xOffset = 400, yOffset = 420` | Player restart position |
| `Player.js:3` | `speed = 9` | Player movement speed |
| `Enemie.js:16` | `Math.floor(Math.random()*5)+3` | Enemy speed range (3–7) |
| `Enemie.js:22` | `dx = width - 60` | Collision horizontal tolerance |
| `Enemie.js:23` | `dy = height - 10` | Collision vertical tolerance |
| `Game.js:40` | `new Player(400, 500, 9, "player")` | Initial player construction |

### Score does not pause on game over
`ScoreManager.start()` fires `setInterval` once and never stops — score keeps incrementing even after collision. The `restart()` method resets it to 0. This is the current design; the score display simply stops updating because `update()` checks `player.isAlive()` before rendering.

### Static high scores
The leaderboard (`#rankingList` in `index.html`) is hardcoded HTML. There is no persistence mechanism.

### Fixed layout
The game container is exactly 1250×1000 px with absolute positioning throughout. It does not scale or adapt to viewport size.

## Extending the Game

### Adding a new enemy type
1. Add a sprite PNG to `img/cars/resized/`
2. Add a CSS rule in `gameContainer.css` targeting `.enemie` (or a new class) with the new `background-image`
3. Optionally subclass or parameterize `Enemie` with an image path argument

### Adding a new key binding
1. Add the key name and keyCode to `InputManager.keys` and `InputManager.keysDown`
2. Add a mapping entry to `ActionsManager.actions`

### Adding a new JS file
1. Create the file in `js/`
2. Add a `<script src="js/YourFile.js">` tag to `index.html` **before** `Game.js` and after any dependencies

### Adding new CSS
Add rules to `css/gameContainer.css` for game elements or `css/style.css` for layout/UI elements.
