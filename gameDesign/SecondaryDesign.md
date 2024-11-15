## 1. Lobby P0
Manages waiting room and game initialization.
* **Methods**
   * `tipsRotation` P2
      * **Behavior**: Rotating tips for enjoyment

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
   * `int: wood` - #wood owned P2
   * `int: stone` - #stone owned P2
   * `int: steel` - #steel owned P2
   * `Armor: head` - Head armor P2
   * `Armor: body` - Body armor P2
   * `Armor: feet` - Feet armor P2
   * `int: totalDefense` - Compiles the total defense for the player. Damage = Attack - defense P2

---

## 6. PlayerProfile P0
* **Variables**
   * `String: quote` - User quote P2
   * `String[]: achievements` - List of achievements P2

---

## 9. Armor P2
* **Variables**
   * `String: type` - "Head", "Body", or "Feet"
   * `int: defense` - #defense provided
   * `int: durability` - See below
* **Methods**
   * `decreaseDurability`
      * **Behavior**: Decrease durability by 1 every time someone hits player. 0 durability = broken (provides 0 defense to player)