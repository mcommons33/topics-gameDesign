class Player extends Entity {
  constructor(scene, x, y, username) {
      super(scene, x, y, 'player');
      this.username = username;
      this.health = GameConfig.PLAYER.HEALTH;
      this.armor = 0;
      this.speed = GameConfig.PLAYER.SPEED;
      this.isMoving = false;
      this.isSprinting = false;
      this.currentWeapon = null;
      this.inventory = {
          weapons: [],
          ammo: new Map()
      };

      this.createSprite();
      this.setupEventListeners();
  }

  createSprite() {
      // Create player circle
      this.sprite = this.scene.add.circle(0, 0, GameConfig.PLAYER.SIZE, GameConfig.PLAYER.COLORS.DEFAULT);
      
      // Create name text
      this.nameText = this.scene.add.text(0, -30, this.username, {
          fontSize: '16px',
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4
      }).setOrigin(0.5, 1);

      // Create container
      this.container = this.scene.add.container(this.position.x, this.position.y, [
          this.sprite,
          this.nameText
      ]);

      // Enable physics
      this.scene.physics.world.enable(this.container);
      this.container.body.setCircle(GameConfig.PLAYER.SIZE);
      this.container.body.setCollideWorldBounds(true);
  }

  setupEventListeners() {
      this.scene.events.on('update', this.update, this);
  }

  update() {
      if (this.isDead) return;

      this.handleMovement();
      if (this.currentWeapon) {
          this.handleShooting();
      }
  }

  handleMovement() {
      const input = this.scene.inputManager.getMovementInput();
      const body = this.container.body;
      
      // Calculate speed with sprint modifier
      const currentSpeed = this.isSprinting ? 
          this.speed * GameConfig.PLAYER.SPRINT_MULTIPLIER : 
          this.speed;

      // Apply movement
      if (input.x || input.y) {
          body.setVelocity(
              input.x * currentSpeed,
              input.y * currentSpeed
          );
          this.isMoving = true;
      } else {
          body.setVelocity(0, 0);
          this.isMoving = false;
      }

      // Normalize diagonal movement
      body.velocity.normalize().scale(currentSpeed);

      // Update position
      this.position.x = this.container.x;
      this.position.y = this.container.y;
  }

  handleShooting() {
      if (this.scene.input.activePointer.isDown && !this.currentWeapon.isReloading) {
          this.currentWeapon.shoot();
      }
  }

  takeDamage(amount) {
      if (this.isDead) return;

      // Calculate damage reduction from armor
      let remainingDamage = amount;
      if (this.armor > 0) {
          const armorDamage = Math.min(this.armor, amount);
          this.armor -= armorDamage;
          remainingDamage -= armorDamage;
      }

      // Apply remaining damage to health
      this.health = Math.max(0, this.health - remainingDamage);

      // Flash effect
      this.sprite.setFillStyle(GameConfig.PLAYER.COLORS.DAMAGED);
      this.scene.time.delayedCall(100, () => {
          this.sprite.setFillStyle(GameConfig.PLAYER.COLORS.DEFAULT);
      });

      if (this.health <= 0) {
          this.die();
      }

      // Emit damage event
      this.scene.events.emit('playerDamaged', this);
  }

  die() {
      this.isDead = true;
      this.scene.events.emit('playerDeath', this);
  }

  pickupWeapon(weapon) {
      if (this.inventory.weapons.length >= 2) {
          this.dropWeapon();
      }
      
      this.inventory.weapons.push(weapon);
      this.currentWeapon = weapon;
      weapon.setOwner(this);
  }

  dropWeapon() {
      if (this.currentWeapon) {
          this.currentWeapon.drop();
          this.inventory.weapons = this.inventory.weapons.filter(w => w !== this.currentWeapon);
          this.currentWeapon = this.inventory.weapons[0] || null;
      }
  }

  destroy() {
      this.container.destroy();
      super.destroy();
  }
}