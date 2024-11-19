// gameLobbyScene.js

class GameLobbyScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameLobbyScene' });
    }
  
    preload() {
      // Load any assets if needed
      // For now, we'll use simple graphics, so no assets are required
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
      // No need to enable physics on the player sprite itself
  
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
  
      // Movement speed
      this.speed = 200;
  
      // Collision between player and terrain
      this.physics.add.collider(this.playerContainer, this.terrainGroup);
    }
  
    update() {
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
    }
  
    createTerrain() {
      // Create a group for terrain objects
      this.terrainGroup = this.physics.add.staticGroup();
  
      // Add some terrain blocks (simple rectangles)
      // For example, create a rectangle in the middle of the map
      const terrainBlock = this.add.rectangle(800, 600, 200, 50, 0x8B4513); // Brown color
      this.physics.add.existing(terrainBlock, true); // true makes it immovable
      this.terrainGroup.add(terrainBlock);
  
      // Example: Add boundaries or additional obstacles as needed
    }
  }
  