class Weapon extends Entity {
  constructor(scene, x, y, type) {
      super(scene, x, y, 'weapon');
      this.config = WeaponConfig[type];
      this.type = type;
      this.currentAmmo = this.config.magazineSize;
      this.reserveAmmo = 0;
      this.isReloading = false;
      this.lastFireTime = 0;
      this.owner = null;

      this.createSprite();
  }

  createSprite() {
      this.sprite = this.scene.add.rectangle(
          this.position.x,
          this.position.y,
          30,
          10,
          this.config.color
      );
      this.scene.physics.add.existing(this.sprite);
      this.sprite.body.setImmovable(true);
  }

  shoot() {
      const now = Date.now();
      if (this.isReloading || 
          this.currentAmmo <= 0 || 
          now - this.lastFireTime < this.config.fireRate) {
          return false;
      }

      this.lastFireTime = now;
      this.currentAmmo--;

      if (this.config.pellets) {
          // Shotgun-style spread
          for (let i = 0; i < this.config.pellets; i++) {
              this.createBullet(true);
          }
      } else {
          this.createBullet(false);
      }

      // Create muzzle flash
      this.scene.particleManager.createMuzzleFlash(
          this.owner.container.x,
          this.owner.container.y,
          this.owner.container.rotation
      );

      if (this.currentAmmo === 0) {
          this.reload();
      }

      return true;
  }

  createBullet(isSpread) {
      const spread = isSpread ? this.config.spread : (this.config.spread * 0.2);
      const angle = this.owner.container.rotation + 
                   (Math.random() - 0.5) * spread;

      const bullet = this.scene.add.circle(
          this.owner.container.x,
          this.owner.container.y,
          3,
          this.config.bulletColor
      );

      this.scene.physics.add.existing(bullet);
      bullet.body.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;

      const velocity = {
          x: Math.cos(angle) * this.config.bulletSpeed,
          y: Math.sin(angle) * this.config.bulletSpeed
      };
      bullet.body.setVelocity(velocity.x, velocity.y);

      // Add collision with terrain
      this.scene.physics.add.collider(bullet, this.scene.terrainGroup, (bullet) => {
          this.scene.particleManager.createBulletImpact(bullet.x, bullet.y);
          bullet.destroy();
      });

      // Destroy bullet after time
      this.scene.time.delayedCall(2000, () => {
          if (bullet && bullet.body) {
              bullet.destroy();
          }
      });

      return bullet;
  }

  reload() {
      if (this.isReloading || this.currentAmmo >= this.config.magazineSize || this.reserveAmmo <= 0) {
          return;
      }

      this.isReloading = true;
      this.scene.events.emit('weaponReloadStart', this);

      this.scene.time.delayedCall(this.config.reloadTime, () => {
          const ammoNeeded = this.config.magazineSize - this.currentAmmo;
          const ammoToReload = Math.min(ammoNeeded, this.reserveAmmo);
          
          this.currentAmmo += ammoToReload;
          this.reserveAmmo -= ammoToReload;
          
          this.isReloading = false;
          this.scene.events.emit('weaponReloadComplete', this);
      });
  }

  setOwner(player) {
      this.owner = player;
      if (this.sprite) {
          this.sprite.destroy();
      }
  }

  drop() {
      this.owner = null;
      this.createSprite();
      this.sprite.x = this.position.x;
      this.sprite.y = this.position.y;
  }

  update() {
      if (!this.owner) return;

      // Update weapon position and rotation with owner
      const offset = 20;
      this.position.x = this.owner.container.x + Math.cos(this.owner.container.rotation) * offset;
      this.position.y = this.owner.container.y + Math.sin(this.owner.container.rotation) * offset;
      this.rotation = this.owner.container.rotation;

      if (this.sprite) {
          this.sprite.x = this.position.x;
          this.sprite.y = this.position.y;
          this.sprite.rotation = this.rotation;
      }
  }

  destroy() {
      if (this.sprite) {
          this.sprite.destroy();
      }
      super.destroy();
  }
}