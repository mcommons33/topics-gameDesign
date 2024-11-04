# Core Features

- **Multiplayer Compatibility**: Supports over 20 players in one instance.
- **User Profiles & Login System**: Username and password login with saved player profiles, allowing players to log in and access saved stats.
### Jacob's Comment: This is a good idea. It reels people in to play over and over.
- **Static Map Design**: A single uniform map is used for each game, designed with balanced spawn points for items and resources.
### Jacob's Comment: I think the same map every time could get repetitive. I think a randomized map would make each game fresh and exciting, which would be better even if that means sacrificing a bit of balance.
 ### Jacob's Comment: Coming back here. I see how the uniform map could be good. I do think that there should be randomized start location, then. And maybe slightly vary the map every time. Like where the bushes, items, and rooms are. You mentioned this below.
- **Items and Weapons**:
  - **Weapons**: Various firearms, melee weapons, and grenades, each with distinct stats (damage, fire rate, range).
  ### Jacob's Comment: You could also add a weight feature. Like, you can only carry so much. i like games with human limitations like that.
  - **Items**: Healing items (e.g., medkits, bandages), armor (helmets, vests), grenades, and resource-gathering tools.
- **Damage Zone**: Gradually shrinking safe zone starting from the map’s edges, forcing players toward the center.
 ### Jacob's Comment: Fornite ripoff. It's OK, though. Fornite ripoffs are basically an entire genre of game nowadays.
- **Resource Gathering and Building**:
  - **Resources**: Players can collect wood, stone, and steel with a pickaxe.
   ### Jacob's Comment: I'm not going to say fortnite ripoff every time. This is the last time I mention it.
  - **Building Mechanics**: Players can construct breakable walls to block bullets, with varying durability based on material.
- **Redemption Room**: Separate game mode for eliminated players, allowing re-entry upon achieving one kill, closing when only a third of the original players remain.
 ### Jacob's Comment: Cool idea. 20 is not divisible by 3, though. So you have to figure out if you're roudning up or down.

# Functionality and Mechanics

## 1. Login and Profile Management

- Players create accounts with usernames and passwords.
- Saved stats and progress include kill count, death count, resource inventory, and win count.
- Profiles store player ranks, achievements, and customization options.

## 2. Game Lobby

- Players wait for the game to reach a minimum player threshold.
 ### Jacob's Comment: I think that once you reach a certain threshold of people, they should be able to vote to start the game. Like, if there's only 17 people and they want to start, they should be allowed to start.
- Brief tutorial or loading screen tips explain controls, building, and Redemption Room mechanics.
 ### Jacob's Comment: Should be able to shoot things in the waiting room.

## 3. Map Layout and Spawn Points

- Uniform map with randomized item spawn locations and resource zones (wood, stone, steel).
 ### Jacob's Comment: I like this.
- Defined high-ground and low-ground areas, adding a strategic advantage in certain locations.
 ### Jacob's Comment: Cool idea. While we're at it, you could have different biomes with different stuff. You move slower and have worse aim while crossing a river. You have extra defense but less sight while in forest. You can hide in bushes (no defense bonus), but this lowers sight and slowly decreases health cuz of thorns or whatever. etc etc etc.

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
 ### Jacob's Comment: I don't think that the damage zone should get worse over time. Imagine there's like 3 people left and one of them gets caught in the storm and dies in like 2 seconds. That would be anticlimactic.

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
   ### Jacob's Comment: I don't think the building features will work as well in a top-down game such as this one as it does in Fortnite. IDK. It just looks weird in my mind.

## 7. Combat Mechanics

- **Shooting and Reloading**:
  - Simple aiming with reticle, reload timer for weapons.
 ### Jacob's Comment: How would you have a reticle aiming? I thought it was topdown? So you dont have a POV of your character.
  - Headshots and body shots deal variable damage.
   ### Jacob's Comment: Same question as above. Should probably remove both of these.
- **Grenade Throwing**: Limited grenades with an explosion radius, able to damage walls.
- **Health Recovery**: Healing items activate over time, forcing strategic use mid-combat.

## 8. Redemption Room (Elimination Mechanic)

- **Separate Gameplay**:
  - Eliminated players enter a respawn-enabled map call
