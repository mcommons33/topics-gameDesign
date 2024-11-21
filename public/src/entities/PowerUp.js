class PowerUp extends Entity {
  constructor(scene, x, y, type) {
      super(scene, x, y, 'powerup');
      this.config = PowerUpConfig[type];
      this.type = type;
      this.createSprite();
  }

  createSprite() {
      const size = 20;
      this.sprite = this.scene.add.star(
          this.position.x,
          this.position.y,
          5,
          size/2,
          size,
          this.config.color
      );

      this.scene.physics.add.existing(this.sprite);
      this.sprite.body.setImmovable(true);

      // Add glow effect
      this.glow = this.scene.add.circle(
          this.position.x,
          this.position.y,
          size * 1.2,
          this.config.color,
          0.3
      );

      // Add floating animation
      this.scene.tweens.add({
          targets: [this.sprite, this.glow],
          y: this.position.y - 10,
          duration: 1500,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.inOut'
      });
  }

  collect(player) {
      switch(this.type) {
          case 'HEALTH':
              this.applyHealth(player);
              break;
          case 'ARMOR':
              this.applyArmor(player);
              break;
          case 'SPEED':
              this.applySpeedBoost(player);
              break;
      }

      this.scene.particleManager.createPickupEffect(
          this.position.x,
          this.position.y,
          this.config.color
      );

      this.destroy();

      if (this.config.respawnTime) {
          this.scene.time.delayedCall(this.config.respawnTime, () => {
              this.scene.spawnPowerUp(this.type, this.position.x, this.position.y);
          });
      }
  }

  applyHealth(player) {
      const oldHealth = player.health;
      player.health = Math.min(player.health + this.config.value, 100);
      const healAmount = player.health - oldHealth;
      
      if (healAmount > 0) {
          this.scene.particleManager.createHealEffect(player);
      }
  }

  applyArmor(player) {
      const oldArmor = player.armor;
      player.armor = Math.min(player.armor + this.config.value, 100);
      const armorAmount = player.armor - oldArmor;
      
      if (armorAmount > 0) {
          this.scene.particleManager.createArmorEffect(player);
      }
  }

  applySpeedBoost(player) {
      player.speed *= this.config.multiplier;
      
      const speedEffect = this.scene.particleManager.createSpeedEffect(player);
      
      this.scene.time.delayedCall(this.config.duration, () => {
          player.speed /= this.config.multiplier;
          speedEffect.destroy();
      });
  }

  destroy() {
      this.sprite.destroy();
      this.glow.destroy();
      super.destroy();
  }
}