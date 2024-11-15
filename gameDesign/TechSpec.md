Suggested:
phaser.io

programing languages
css, html, etc.

Data model:
https://www.figma.com/board/Pwvyek0boWQGVFEGvdmFHE/MatthewGame


# Battle Royale Game Technical Specification

## 1. Lobby P0
Manages waiting room and game initialization.
* **Variables**
   * `Player[]: players` - Players in game P0
   * `int: waitingTime` - Waiting time (seconds) P0
   * `int: curPlayer` - Current player count P0
* **Methods**
   * `createWaitingPage`P0
      * **Behavior**: Waiting page for player
   * `tipsRotation` P2
      * **Behavior**: Rotating tips for enjoyment
   * `tutorialShowcase`P1
      * **Behavior**: Tutorial showcase

---

## 2. Map P0
Manages the game world and zones.
* **Variables**
   * `int: playerCount` - Players alive P0
   * `int: zone` - Radius for playable area P0
   * `Player[]: players` - All players P0
   * `Player[]: surviving` - Surviving players P0
* **Methods**
   * `generateMap`
      * **Behavior**: Generates a map with random weapons, safe zones, terrain, etc. P0
   * `updateSafeZone`
      * **Behavior**: Update playable zone to force players to the center with a shrinking map P0

---

## 3. SafeZone P2
Handles safe areas and healing mechanics.
* **Variables**
   * `HealingItem[]: healingItems` - The healers in the zone P2
   * `Armor[]: armors` - Armors in the zone P2
* **Methods**
   * `computeTime` P2
      * **Behavior**: Calculates amount of time for player in the zone, kicks them out when reach limit

---

## 4. RedemptionRoom (everything is P2)
* **Variables**
   * `int: playerCount` - Players in map
   * `Player[]: players` - Players
* **Methods**
   * `generateMap`
      * **Behavior**: Generates the map
      * **Note**: Needs clarification

---

## 5. Player P0
* **Variables**
   * `int: health` - Player health P0
   * `int: kills` - #kills P0
   * `int: time` - Survival time (in seconds) P0
   * `int: rifleAmmo` - Ammo # for rifle P0
   * `int: shotgunAmmo` - Ammo # for shotGun P1
   * `int: carbineAmmo` - Ammo # for carbine P1
   * `int: wood` - #wood owned P2
   * `int: stone` - #stone owned P2
   * `int: steel` - #steel owned P2
   * `Guns[]: guns` - List of guns player currently owns. Max 3 --> P0 but change to only 2 guns P1 for 3rd gun
   * `Armor: head` - Head armor P2
   * `Armor: body` - Body armor P2
   * `Armor: feet` - Feet armor P2
   * `int: totalDefense` - Compiles the total defense for the player. Damage = Attack - defense P2
   * `double: locationX` - Current location of player (x) P0
   * `double: locationY` - Current location of player (y) P0
   * `boolean: isOnline` - Is the player online or offline? P0
   * `String: name` - User name P0
* **Methods**
   * `BuildWalls(String type)` P1
      * **Behavior**: Build walls based on given type
   * `UpdateArmor` P1
      * **Behavior**: When player equips an armor, updates the armor and recompiles total defense
   * `pickUp` P0
      * **Behavior**: Grabs the material in front. Return null if nothing is grabbed. Else, increase count of the material picked up
   * `computesHealth` P0
      * **Behavior**: If damaged, compute health
   * `update...`P0
      * **Behavior**: Multiple methods to update current resources, kill count, etc.
   * `generateSpawnPoint` P0
      * **Behavior**: Generates spawn point for player
   * `encounterWalls` P1
      * **Behavior**: Computes what happen when encountering obstacles
   * `Player` P0
      * **Behavior**: Constructor; creates an empty player file

---

## 6. PlayerProfile P0
* **Variables**
   * `String: name` - Player name P0
   * `String: pass` - Password P0
   * `String: quote` - User quote P2
   * `String[]: achievements` - List of achievements P2
   * `int: totalKillCount` P1
   * `int: totalGames` P1
   * `int: deathCount` P1
   * `int: winCount` P1
   * `int: ranks` - Player rank P1

---

## 7. Guns P0
* **Variables**
   * `String: type` - "Rifle", "Shotgun", or "carbine" P0 for Rifle & Shotgun, P1 for carbine
   * `int: ammo` - Ammo count (in gun) P0
   * `int: minDamage` - Minimum amount of damage from this gun P0
   * `int: maxDamage` - Maximum amount of damage from this gun P0
   * `int: hitRate` - A % for gun accuracy P0
   * `int: reloadTime` - A time for reloading P0
   * `int: capacity` - Amount of bullets a gun can hold at a time P0
* **Methods**
   * `Fire` P0
      * **Behavior**: Depends on the gun type, deal damage. Damage will range from minDamage to maxDamage
   * `reload` P0
      * **Behavior**: Reload ammo to max. Will happen automatically or manually. Deduct ammo from player backpack

---

## 8. HealingItem P1
* **Variables**
   * `int: hps` - #heal per second
   * `int: time` - Time item will last (seconds)
* **Methods**
   * `onUse`
      * **Behavior**: Recover health over a certain period of time on use; destruct afterwards

---

## 9. Armor P2
* **Variables**
   * `String: type` - "Head", "Body", or "Feet"
   * `int: defense` - #defense provided
   * `int: durability` - See below
* **Methods**
   * `decreaseDurability`
      * **Behavior**: Decrease durability by 1 every time someone hits player. 0 durability = broken (provides 0 defense to player)