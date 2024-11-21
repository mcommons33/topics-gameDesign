class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // World settings
    const worldWidth = 3200;  // Larger world for battle royale
    const worldHeight = 2400;

    // Set up world bounds
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Initialize game state
    this.gameState = {
      playerHealth: 100,
      safeZoneRadius: worldWidth / 2,
      minSafeZoneRadius: 200,
      damagePerSecond: 1,
      safeZoneShrinkRate: 0.5,
    };

    // Create map and terrain
    this.createMap();

    // Create player
    this.createPlayer();

    // Set up damage zone
    this.setupDamageZone();

    // Create UI elements
    this.createUI();

    // Start the safe zone shrinking
    this.startSafeZoneShrink();
  }

  createMap() {
    // Background
    this.add.rectangle(0, 0, this.physics.world.bounds.width, 
                      this.physics.world.bounds.height, 0x87ceeb)
      .setOrigin(0, 0);

    // Create terrain group
    this.terrainGroup = this.physics.add.staticGroup();

    // Add varied terrain
    this.createTerrain();
  }

  createTerrain() {
    // Define different terrain types
    const terrainTypes = {
      ROCK: { color: 0x808080, size: { min: 50, max: 150 } },
      TREE: { color: 0x355E3B, size: { min: 30, max: 60 } },
      WALL: { color: 0x8B4513, size: { min: 100, max: 300 } }
    };

    // Create random terrain
    for (let i = 0; i < 50; i++) {
      const type = Phaser.Utils.Array.GetRandom(Object.values(terrainTypes));
      const x = Phaser.Math.Between(100, this.physics.world.bounds.width - 100);
      const y = Phaser.Math.Between(100, this.physics.world.bounds.height - 100);
      const width = Phaser.Math.Between(type.size.min, type.size.max);
      const height = Phaser.Math.Between(type.size.min, type.size.max);

      const terrain = this.add.rectangle(x, y, width, height, type.color);
      this.physics.add.existing(terrain, true);
      this.terrainGroup.add(terrain);
    }
  }

  createPlayer() {
    // Create player container with visual and hitbox
    const username = localStorage.getItem('username') || 'Player';
    
    this.player = this.add.circle(0, 0, 20, 0x00ff00);
    this.playerNameText = this.add.text(0, -30, username, {
      fontSize: '16px',
      color: '#000000'
    }).setOrigin(0.5, 1);

    // Create player container
    this.playerContainer = this.add.container(
      Phaser.Math.Between(100, this.physics.world.bounds.width - 100),
      Phaser.Math.Between(100, this.physics.world.bounds.height - 100),
      [this.player, this.playerNameText]
    );

    // Enable physics
    this.physics.world.enable(this.playerContainer);
    this.playerContainer.body.setCollideWorldBounds(true);
    this.playerContainer.body.setSize(40, 40);

    // Add collision with terrain
    this.physics.add.collider(this.playerContainer, this.terrainGroup);

    // Set up camera to follow player
    this.cameras.main.startFollow(this.playerContainer, true);

    // Set up movement controls
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  setupDamageZone() {
    // Create the safe zone circle graphics
    this.safeZone = this.add.graphics();
    this.updateSafeZone();

    // Create the damage zone timer
    this.time.addEvent({
      delay: 1000,
      callback: this.applyDamageZoneDamage,
      callbackScope: this,
      loop: true
    });
  }

  createUI() {
    // Health bar background
    this.add.rectangle(10, 10, 204, 24, 0x000000)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // Health bar
    this.healthBar = this.add.rectangle(12, 12, 200, 20, 0xff0000)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // Health text
    this.healthText = this.add.text(114, 22, '100 HP', {
      fontSize: '16px',
      color: '#ffffff'
    })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0);
  }

  startSafeZoneShrink() {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.gameState.safeZoneRadius > this.gameState.minSafeZoneRadius) {
          this.gameState.safeZoneRadius -= this.gameState.safeZoneShrinkRate;
          this.updateSafeZone();
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  updateSafeZone() {
    this.safeZone.clear();
    this.safeZone.lineStyle(2, 0x00ff00, 1);
    this.safeZone.strokeCircle(
      this.physics.world.bounds.centerX,
      this.physics.world.bounds.centerY,
      this.gameState.safeZoneRadius
    );
  }

  applyDamageZoneDamage() {
    const distance = Phaser.Math.Distance.Between(
      this.playerContainer.x,
      this.playerContainer.y,
      this.physics.world.bounds.centerX,
      this.physics.world.bounds.centerY
    );

    if (distance > this.gameState.safeZoneRadius) {
      this.gameState.playerHealth -= this.gameState.damagePerSecond;
      this.updateHealthUI();

      if (this.gameState.playerHealth <= 0) {
        this.gameOver();
      }
    }
  }

  updateHealthUI() {
    // Update health bar width
    const healthPercent = this.gameState.playerHealth / 100;
    this.healthBar.width = 200 * healthPercent;
    this.healthText.setText(`${Math.ceil(this.gameState.playerHealth)} HP`);
  }

  gameOver() {
    // Simple game over implementation
    this.scene.start('GameLobbyScene');
  }

  update() {
    // Handle player movement
    const speed = 200;
    const body = this.playerContainer.body;

    // Reset velocity
    body.setVelocity(0);

    // Handle WASD movement
    if (this.keys.W.isDown) {
      body.setVelocityY(-speed);
    }
    if (this.keys.S.isDown) {
      body.setVelocityY(speed);
    }
    if (this.keys.A.isDown) {
      body.setVelocityX(-speed);
    }
    if (this.keys.D.isDown) {
      body.setVelocityX(speed);
    }

    // Normalize diagonal movement
    if (body.velocity.length() > 0) {
      body.velocity.normalize().scale(speed);
    }

    // Keep player name text aligned
    this.playerNameText.x = 0;
    this.playerNameText.y = -30;
  }
}