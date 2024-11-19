// gameScene.js

class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload() {
      // Load any assets for the game
    }
  
    create() {
      // Retrieve the username from localStorage
      const username = localStorage.getItem('username') || 'Player';
  
      // Display the username on the screen
      this.add.text(10, 10, `Player: ${username}`, { fontSize: '24px', color: '#FFFFFF' });
  
      // Initialize game objects here
  
      // For now, let's add a simple player sprite
      this.player = this.add.circle(400, 300, 20, 0x00ff00);
  
      // Enable physics on the player
      this.physics.add.existing(this.player);
  
      // Set up keyboard input
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    update() {
      // Handle player movement
      const speed = 200;
      const playerBody = this.player.body;
  
      // Stop any previous movement
      playerBody.setVelocity(0);
  
      // Horizontal movement
      if (this.cursors.left.isDown) {
        playerBody.setVelocityX(-speed);
      } else if (this.cursors.right.isDown) {
        playerBody.setVelocityX(speed);
      }
  
      // Vertical movement
      if (this.cursors.up.isDown) {
        playerBody.setVelocityY(-speed);
      } else if (this.cursors.down.isDown) {
        playerBody.setVelocityY(speed);
      }
  
      // Normalize and scale the velocity so that player can't move faster diagonally
      playerBody.velocity.normalize().scale(speed);
    }
  }
  