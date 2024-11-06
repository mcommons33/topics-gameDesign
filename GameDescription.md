# Core Features

- **Multiplayer Compatibility**: Supports over 20 players in one instance.
- **User Profiles & Login System**: Username and password login with saved player profiles, allowing players to log in and access saved stats.
- **Static Map Design**: A single uniform map is used for each game, designed with balanced spawn points for items and resources.
- **Randomized Start Location**: Each player will spawn in a random location on the same map.
- **Items and Weapons**:
  - **Weapons**: Various firearms, melee weapons, and grenades, each with distinct stats (damage, fire rate, range).
  - **Items**: Healing items (e.g., medkits, bandages), armor (helmets, vests), grenades, and resource-gathering tools.
- **Damage Zone**: Gradually shrinking safe zone starting from the map’s edges, forcing players toward the center.
- **Resource Gathering and Building**:
  - **Resources**: Players can collect wood, stone, and steel with a pickaxe.
  - **Building Mechanics**: Players can construct breakable walls to block bullets, with varying durability based on material.
- **Redemption Room**: Separate game mode for eliminated players, allowing re-entry upon achieving one kill, closing when only a third of the original players remain.

# Functionality and Mechanics

## 1. Login and Profile Management

- Players create accounts with usernames and passwords.
- Saved stats and progress include kill count, death count, resource inventory, and win count.
- Profiles store player ranks, achievements, and customization options.

## 2. Game Lobby

- Players wait for the game to reach a minimum player threshold.
- Brief tutorial or loading screen tips explain controls, building, and Redemption Room mechanics.

## 3. Map Layout and Spawn Points

- Uniform map with randomized item spawn locations and resource zones (wood, stone, steel).
- Defined high-ground and low-ground areas, adding a strategic advantage in certain locations.

## 4. In-game Items and Weaponry

- **Randomized Item Spawns**:
  - Weapons (shotguns, rifles, etc.) spawn at varied map points.
  - Healing items and armor spawn in designated “safe zones” (medical tents, ammo crates).
- **Item Effects**:
  - Healing items replenish health over time.
  - Armor reduces damage received until its durability is depleted.

## 5. Shrinking Damage Zone

- **Zone Mechanics**:
  - Initially circles the map’s edges, shrinking toward the center.
  - Shrinks at regular intervals, with visual warnings and countdowns.
- **Player Damage**: Health decreases gradually when in the damage zone, increasing as the game progresses.

## 6. Resource Gathering and Building

- **Resource Collection**:
  - Players start with a pickaxe and can gather wood, stone, and steel from designated zones.
- **Building**:
  - Quick-access building menu allows for fast wall placement.
  - Walls have durability based on material:
    - **Wood**: Lowest durability, easiest to gather.
    - **Stone**: Medium durability, moderate availability.
    - **Steel**: Highest durability, scarce.
  - **Destructible Walls**: Bullet impacts reduce wall durability until they collapse.

## 7. Combat Mechanics

- **Shooting and Reloading**:
  - Simple aiming with reticle, reload timer for weapons.
  - Headshots and body shots deal variable damage.
- **Grenade Throwing**: Limited grenades with an explosion radius, able to damage walls.
- **Health Recovery**: Healing items activate over time, forcing strategic use mid-combat.

## 8. Redemption Room (Elimination Mechanic)

- **Separate Gameplay**:
  - Eliminated players enter a respawn-enabled map call
