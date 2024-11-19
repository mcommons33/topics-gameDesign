// gameLobbyScene.js

class GameLobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameLobbyScene' });
  }

  preload() {
    // No assets to load since we're using simple shapes
  }

  create() {
    // Define the world size
    const worldWidth = 1600;
    const worldHeight = 1200;

    // Set the boundaries of the world
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // Set the camera bounds
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Add a background color
    this.cameras.main.setBackgroundColor('#87ceeb'); // Sky blue color

    // Create basic terrain (simple rectangles for now)
    this.createTerrain();

    // Retrieve the username from localStorage
    const username = localStorage.getItem('username') || 'Player';

    // Create the player sprite (a simple circle for now)
    this.player = this.add.circle(0, 0, 20, 0x00ff00); // Green circle

    // Add the player name text above the player
    this.playerNameText = this.add.text(0, -30, username, { fontSize: '16px', color: '#000000' });
    this.playerNameText.setOrigin(0.5, 1); // Center horizontally, align to bottom

    // Create a container to group the player and the name text
    this.playerContainer = this.add.container(400, 300, [this.player, this.playerNameText]);

    // Enable physics on the container
    this.physics.world.enable(this.playerContainer);

    // Set the size of the physics body to match the player sprite
    this.playerContainer.body.setSize(this.player.width, this.player.height);
    this.playerContainer.body.setOffset(-this.player.width / 2, -this.player.height / 2);

    this.playerContainer.body.setCollideWorldBounds(true);

    // Set up camera to follow the player container
    this.cameras.main.startFollow(this.playerContainer, true, 0.05, 0.05);

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Key to pick up items
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // Key to reload

    // Movement speed
    this.speed = 200;

    // Collision between player and terrain
    this.physics.add.collider(this.playerContainer, this.terrainGroup);

    // Initialize player weapon and ammo
    this.hasWeapon = false;
    this.ammoSupply = 0; // Total ammo in reserve
    this.magazineSize = 30; // Magazine capacity
    this.ammoInMagazine = 0; // Ammo currently in magazine
    this.isReloading = false;

    // Spawn a weapon on the ground
    this.spawnWeapon();

    // Spawn ammo packs around the map
    this.spawnAmmoPacks();

    // Display ammo count
    this.ammoText = this.add
      .text(16, 16, 'Ammo: 0 / 0', { fontSize: '20px', fill: '#000' })
      .setScrollFactor(0);

    // Reload progress indicator (invisible by default)
    this.reloadGraphics = this.add.graphics().setScrollFactor(0);
    this.reloadGraphics.visible = false;

    // Out of ammo text (invisible by default)
    this.outOfAmmoText = this.add
      .text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 50, 'Out of Ammo!', {
        fontSize: '24px',
        fill: '#ff0000',
      })
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.outOfAmmoText.visible = false;
  }

  update(time, delta) {
    // Handle player movement
    const body = this.playerContainer.body;

    // Stop any previous movement
    body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      body.setVelocityX(this.speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      body.setVelocityY(this.speed);
    }

    // Normalize and scale the velocity so that the player can't move faster diagonally
    if (body.velocity.length() > 0) {
      body.velocity.normalize().scale(this.speed);
    }

    // Ensure the player sprite and text are correctly positioned in the container
    this.player.x = 0;
    this.player.y = 0;
    this.playerNameText.x = 0;
    this.playerNameText.y = -30;

    // Handle item pickup
    if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
      this.pickUpItem();
    }

    // Handle shooting
    if (this.hasWeapon && this.input.activePointer.isDown && !this.isReloading) {
      this.shoot();
    }

    // Handle reloading
    if (this.hasWeapon && Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.reloadWeapon();
    }
  }

  createTerrain() {
    // Create a group for terrain objects
    this.terrainGroup = this.physics.add.staticGroup();

    // Add some terrain blocks (simple rectangles)
    const terrainBlock = this.add.rectangle(800, 600, 200, 50, 0x8b4513); // Brown color
    this.physics.add.existing(terrainBlock, true); // true makes it immovable
    this.terrainGroup.add(terrainBlock);
  }

  spawnWeapon() {
    // Spawn a weapon at a fixed location (red square)
    this.weapon = this.add.rectangle(500, 400, 20, 20, 0xff0000);
    this.physics.add.existing(this.weapon);
    this.weapon.body.setImmovable(true);

    // Enable collision with player
    this.physics.add.overlap(this.playerContainer, this.weapon, () => {
      // Do nothing here; we'll handle pickup manually
    });
  }

  spawnAmmoPacks() {
    // Create a group for ammo packs
    this.ammoGroup = this.physics.add.group();

    // Spawn ammo packs at random locations with random quantities
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(100, 1500);
      const y = Phaser.Math.Between(100, 1100);

      // Randomize ammo quantity: 10, 20, or 30
      const quantities = [10, 20, 30];
      const ammoQuantity = Phaser.Utils.Array.GetRandom(quantities);

      // Choose color based on quantity
      let color;
      switch (ammoQuantity) {
        case 10:
          color = 0x0000ff; // Blue
          break;
        case 20:
          color = 0x00ffff; // Cyan
          break;
        case 30:
          color = 0x00ff00; // Green
          break;
        default:
          color = 0x0000ff; // Default to blue
      }

      const ammoPack = this.add.rectangle(x, y, 15, 15, color);
      this.physics.add.existing(ammoPack);
      ammoPack.body.setImmovable(true);
      ammoPack.ammoQuantity = ammoQuantity; // Store the quantity in the ammo pack
      this.ammoGroup.add(ammoPack);
    }

    // Enable collision with player
    this.physics.add.overlap(this.playerContainer, this.ammoGroup, () => {
      // Do nothing here; we'll handle pickup manually
    });
  }

  pickUpItem() {
    // Check if close to the weapon
    if (
      !this.hasWeapon &&
      this.weapon &&
      Phaser.Math.Distance.BetweenPoints(this.playerContainer, this.weapon) < 50
    ) {
      this.pickUpWeapon();
    }

    // Check for ammo packs
    this.ammoGroup.children.iterate((ammoPack) => {
      if (
        ammoPack &&
        Phaser.Math.Distance.BetweenPoints(this.playerContainer, ammoPack) < 50
      ) {
        this.pickUpAmmo(ammoPack);
      }
    });
  }

  pickUpWeapon() {
    this.hasWeapon = true;
    this.ammoInMagazine = this.magazineSize;
    this.ammoSupply = 0; // Start with no extra ammo
    this.weapon.destroy(); // Remove the weapon from the ground
    this.weapon = null; // Set to null to avoid errors
    this.updateAmmoText();
  }

  pickUpAmmo(ammoPack) {
    this.ammoSupply += ammoPack.ammoQuantity; // Increase ammo supply by the pack's quantity
    this.updateAmmoText();
    ammoPack.destroy(); // Remove the ammo pack from the ground
  }

  shoot() {
    if (this.ammoInMagazine > 0 && !this.isReloading) {
      this.ammoInMagazine--;
      this.updateAmmoText();

      // Create a bullet (simple circle for now)
      const bullet = this.add.circle(this.playerContainer.x, this.playerContainer.y, 5, 0xff0000);
      this.physics.add.existing(bullet);
      bullet.body.setCircle(5);
      bullet.body.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;

      // Bullet collision with terrain
      this.physics.add.collider(bullet, this.terrainGroup, () => {
        bullet.destroy();
      });

      // Calculate the angle towards the pointer
      const angle = Phaser.Math.Angle.Between(
        this.playerContainer.x,
        this.playerContainer.y,
        this.input.activePointer.worldX,
        this.input.activePointer.worldY
      );

      // Set bullet velocity
      const bulletSpeed = 500;
      bullet.body.velocity.x = Math.cos(angle) * bulletSpeed;
      bullet.body.velocity.y = Math.sin(angle) * bulletSpeed;

      // Destroy the bullet after some time
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          if (bullet && bullet.body) {
            bullet.destroy();
          }
        },
      });

      // Hide out of ammo message if visible
      this.outOfAmmoText.visible = false;
    } else if (this.ammoInMagazine === 0 && !this.isReloading) {
      // Automatically reload if magazine is empty
      this.reloadWeapon();
    }
  }

  reloadWeapon() {
    if (!this.isReloading && this.ammoInMagazine < this.magazineSize) {
      if (this.ammoSupply > 0) {
        this.isReloading = true;
        const reloadTime = 2000; // 2 seconds reload time

        // Show reload progress
        this.reloadGraphics.visible = true;
        this.reloadGraphics.clear();
        const radius = 30;
        const x = this.cameras.main.width / 2;
        const y = this.cameras.main.height / 2;

        let progress = 0;
        const interval = 50;
        const totalIntervals = reloadTime / interval;

        const reloadEvent = this.time.addEvent({
          delay: interval,
          repeat: totalIntervals,
          callback: () => {
            progress += interval;
            const percentage = progress / reloadTime;

            // Draw circular progress
            this.reloadGraphics.clear();
            this.reloadGraphics.lineStyle(8, 0xffffff, 1);
            this.reloadGraphics.beginPath();
            this.reloadGraphics.arc(
              x,
              y,
              radius,
              -Math.PI / 2,
              -Math.PI / 2 + Math.PI * 2 * percentage,
              false
            );
            this.reloadGraphics.strokePath();

            if (percentage >= 1) {
              // Reload complete
              this.isReloading = false;
              // Calculate how much ammo to reload
              const ammoNeeded = this.magazineSize - this.ammoInMagazine;
              const ammoToLoad = Math.min(this.ammoSupply, ammoNeeded);
              this.ammoSupply -= ammoToLoad;
              this.ammoInMagazine += ammoToLoad;
              this.updateAmmoText();
              this.reloadGraphics.visible = false;
              reloadEvent.remove();
            }
          },
        });
      } else {
        // No ammo in supply
        this.outOfAmmoText.visible = true;
        this.time.addEvent({
          delay: 2000,
          callback: () => {
            this.outOfAmmoText.visible = false;
          },
        });
      }
    }
  }

  updateAmmoText() {
    this.ammoText.setText(`Ammo: ${this.ammoInMagazine} / ${this.ammoSupply}`);
  }
}
