### Lobby
**Priority:** [P0]
**Implementation Timeline:** [Day 1]

**Core Requirements:**
- Manages waiting room and game initialization.

**Technical Components:**
- `Player[]: players` - Players in game P0
- `int: waitingTime` - Waiting time (seconds) P0
- `int: curPlayer` - Current player count P0
- `createWaitingPage`P0
      * **Behavior**: Waiting page for player

**Simplifications:**
- `tutorialShowcase`P1
      * **Behavior**: Tutorial showcase

---

### Map
**Priority:** [P0]
**Implementation Timeline:** [Day 1-2]

**Core Requirements:**
- Manages the game world and zones.

**Technical Components:**
- `int: playerCount` - Players alive P0
- `int: zone` - Radius for playable area P0
- `Player[]: players` - All players P0
- `Player[]: surviving` - Surviving players P0
- `generateMap`
      * **Behavior**: Generates a map with random weapons, safe zones, terrain, etc. P0
- `updateSafeZone`
      * **Behavior**: Update playable zone to force players to the center with a shrinking map P0

**Dependencies:**
- Lobby needs to be initialized.

---

### Player
**Priority:** [P0]
**Implementation Timeline:** [Day 3]

**Core Requirements:**
- Allow players to spawn, keep track of inventory, health, and location.

**Technical Components:**
- `int: health` - Player health P0
- `int: kills` - #kills P0
- `int: time` - Survival time (in seconds) P0
- `int: rifleAmmo` - Ammo # for rifle P0
- `Guns[]: guns` - List of guns player currently owns. Max 3 --> P0 but change to only 2 guns P1 for 3rd gun
- `double: locationX` - Current location of player (x) P0
- `double: locationY` - Current location of player (y) P0
- `boolean: isOnline` - Is the player online or offline? P0
- `String: name` - User name P0

**Simplifications:**
- For guns only implement shotgun and rifle, carbine if time allows.
- `int: shotgunAmmo` - Ammo # for shotGun P1 --> just have the same ammo for all guns
- `int: carbineAmmo` - Ammo # for carbine P1

**Dependencies:**
- Guns

---

### Player Profile
**Priority:** [P0]
**Implementation Timeline:** [Day 3]

**Core Requirements:**
- Creates player profile with name and password.

**Technical Components:**
- `String: name` - Player name P0
- `String: pass` - Password P0

**Simplifications:**
- `int: totalKillCount` P1
- `int: totalGames` P1
- `int: deathCount` P1
- `int: winCount` P1
- `int: ranks` - Player rank P1

---

### Guns
**Priority:** [P0]
**Implementation Timeline:** [Day 3-4]

**Core Requirements:**
- Basic functionality for guns with shooting, ammo, reload.

**Technical Components:**
- `String: type` - "Rifle", "Shotgun", or "carbine" P0 for Rifle & Shotgun, P1 for carbine
- `int: ammo` - Ammo count (in gun) P0
- `int: minDamage` - Minimum amount of damage from this gun P0
- `int: maxDamage` - Maximum amount of damage from this gun P0
- `int: hitRate` - A % for gun accuracy P0
- `int: reloadTime` - A time for reloading P0
- `int: capacity` - Amount of bullets a gun can hold at a time P0
- `Fire` P0
      * **Behavior**: Depends on the gun type, deal damage. Damage will range from minDamage to maxDamage
- `reload` P0
      * **Behavior**: Reload ammo to max. Will happen automatically or manually. Deduct ammo from player backpack

**Simplifications:**
- Carbine gun implement later if time permits.

**Dependencies:**
- Player inventory.

---

### HealingItem
**Priority:** [P1]
**Implementation Timeline:** [Day 4-5]

**Core Requirements:**
- Spawns healing item that will heal player's health a certain amount.

**Technical Components:**
- `int: hps` - #heal per second
- `int: time` - Time item will last (seconds)
- `onUse`
      * **Behavior**: Recover health; destruct afterwards

**Dependencies:**
- Player health.

---

# MVP Implementation Plan

## Day 1-2 (Core Framework)
- Map (all P0)
- Lobby (all P0)

## Day 3
- Player (all P0)
- PlayerProfile (all P0)
- Guns (all P0, if there is time)

## Day 4
- Guns (all P0)
- HealingItem (if there is time)

## Day 5 (Enhancement & Testing)
- HealingItem
- Within the classes all the P1 features.
- Final testing and refinement.

# Completed Items (by Nathaniel)
- Added skins for the guns, ammo, armed player, and unarmed player
      - To change the look of each item- switch the pngs in the assets directory
      - Only rifles are visible right now, but different types of guns can be added easily by loading them in the preload() method and adjusting the spawnWeapons() method