// gameLobbyScene.js

class GameLobbyScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameLobbyScene' });
    }
  
    preload() {
      // Load any assets if needed
    }
  
    create() {
      // Add a background color
      this.cameras.main.setBackgroundColor('#1d212d');
  
      // Retrieve the username from localStorage
      const username = localStorage.getItem('username') || 'Player';
  
      // Display a welcome message
      this.add.text(400, 100, `Welcome, ${username}!`, { fontSize: '32px', color: '#FFFFFF' }).setOrigin(0.5);
  
      // Add instructions or game tips (optional)
      this.add.text(400, 200, 'Get ready to battle!', { fontSize: '24px', color: '#FFFFFF' }).setOrigin(0.5);
  
      // Create a "Start Game" button
      const startGameButton = this.add.text(400, 300, 'Start Game', { fontSize: '32px', color: '#FFFFFF', backgroundColor: '#28a745' })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive();
  
      // Handle button click
      startGameButton.on('pointerdown', () => {
        // Start the GameScene
        this.scene.start('GameScene');
      });
  
      // Handle button hover effects
      startGameButton.on('pointerover', () => {
        startGameButton.setStyle({ backgroundColor: '#218838' });
      });
  
      startGameButton.on('pointerout', () => {
        startGameButton.setStyle({ backgroundColor: '#28a745' });
      });
    }
  }
  