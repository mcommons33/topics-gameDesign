// main.js

// Create a Phaser configuration object
const config = {
  type: Phaser.AUTO,
  width: 800,   // Width of the game canvas
  height: 600,  // Height of the game canvas
  parent: 'game-container', // The ID of the DOM element to add the canvas to
  scene: [LoginScene, GameLobbyScene, GameScene], // The scenes we'll define
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  dom: {
    createContainer: true
  }
};

// Create a new Phaser Game instance
const game = new Phaser.Game(config);
