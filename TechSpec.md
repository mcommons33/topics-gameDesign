Suggested:
phaser.io

programing languages
css, html, etc.

Data model:
https://www.figma.com/board/Pwvyek0boWQGVFEGvdmFHE/MatthewGame


# Battle Royale Game Technical Specification

## 1. Lobby
Manages waiting room and game initialization.
* **Variables**
   * `Player[]: players` - Players in game 
   * `int: waitingTime` - Waiting time (seconds)
   * `int: curPlayer` - Current player count
* **Methods**
   * `createWaitingPage`
      * **Behavior**: Waiting page for player
   * `tipsRotation`
      * **Behavior**: Rotating tips for enjoyment
   * `tutorialShowcase`
      * **Behavior**: Tutorial showcase

---

## 2. Map
Manages the game world and zones.
* **Variables**
   * `int: playerCount` - Players alive
   * `int: zone` - Radius for playable area
   * `Player[]: players` - All players
   * `Player[]: surviving` - Surviving players
* **Methods**
   * `generateMap`
      * **Behavior**: Generates a map with random weapons, safe zones, terrain, etc.
   * `updateSafeZone`
      * **Behavior**: Update playable zone to force players to the center with a shrinking map

---

## 3. SafeZone
Handles safe areas and healing mechanics.
* **Variables**
   * `HealingItem[]: healingItems` - The healers in the zone
   * `Armor[]: armors` - Armors in the zone
* **Methods**
   * `computeTime`
      * **Behavior**: Calculates amount of time for player in the zone, kicks them out when reach limit

---

## 4. RedemptionRoom
* **Variables**
   * `int: playerCount` - Players in map
   * `Player[]: players` - Players
* **Methods**
   * `generateMap`
      * **Behavior**: Generates the map
      * **Note**: Needs clarification

---

## 5. Player
* **Variables**
   * `int: health` - Player health
   * `int: kills` - #kills
   * `int: time` - Survival time (in seconds)
   * `int: rifleAmmo` - Ammo # for rifle
   * `int: shotgunAmmo` - Ammo # for shotGun
   * `int: carbineAmmo` - Ammo # for carbine
   * `int: wood` - #wood owned
   * `int: stone` - #stone owned
   * `int: steel` - #steel owned
   * `Guns[]: guns` - List of guns player currently owns. Max 3
   * `Armor: head` - Head armor
   * `Armor: body` - Body armor
   * `Armor: feet` - Feet armor
   * `int: totalDefense` - Compiles the total defense for the player. Damage = Attack - defense
   * `double: locationX` - Current location of player (x)
   * `double: locationY` - Current location of player (y)
   * `boolean: isOnline` - Is the player online or offline?
   * `String: name` - User name
* **Methods**
   * `BuildWalls(String type)`
      * **Behavior**: Build walls based on given type
   * `UpdateArmor`
      * **Behavior**: When player equips an armor, updates the armor and recompiles total defense
   * `pickUp`
      * **Behavior**: Grabs the material in front. Return null if nothing is grabbed. Else, increase count of the material picked up
   * `computesHealth`
      * **Behavior**: If damaged, compute health
   * `update...`
      * **Behavior**: Multiple methods to update current resources, kill count, etc.
   * `generateSpawnPoint`
      * **Behavior**: Generates spawn point for player
   * `encounterWalls`
      * **Behavior**: Computes what happen when encountering obstacles
   * `Player`
      * **Behavior**: Constructor; creates an empty player file

---

## 6. PlayerProfile
* **Variables**
   * `String: name` - Player name
   * `String: pass` - Password
   * `String: quote` - User quote
   * `String[]: achievements` - List of achievements
   * `int: totalKillCount`
   * `int: totalGames`
   * `int: deathCount`
   * `int: winCount`
   * `int: ranks` - Player rank

---

## 7. Guns
* **Variables**
   * `String: type` - "Rifle", "Shotgun", or "carbine"
   * `int: ammo` - Ammo count (in gun)
   * `int: minDamage` - Minimum amount of damage from this gun
   * `int: maxDamage` - Maximum amount of damage from this gun
   * `int: hitRate` - A % for gun accuracy
   * `int: reloadTime` - A time for reloading
   * `int: capacity` - Amount of bullets a gun can hold at a time
* **Methods**
   * `Fire`
      * **Behavior**: Depends on the gun type, deal damage. Damage will range from minDamage to maxDamage
   * `reload`
      * **Behavior**: Reload ammo to max. Will happen automatically or manually. Deduct ammo from player backpack

---

## 8. HealingItem
* **Variables**
   * `int: hps` - #heal per second
   * `int: time` - Time item will last (seconds)
* **Methods**
   * `onUse`
      * **Behavior**: Recover health over a certain period of time on use; destruct afterwards

---

## 9. Armor
* **Variables**
   * `String: type` - "Head", "Body", or "Feet"
   * `int: defense` - #defense provided
   * `int: durability` - See below
* **Methods**
   * `decreaseDurability`
      * **Behavior**: Decrease durability by 1 every time someone hits player. 0 durability = broken (provides 0 defense to player)