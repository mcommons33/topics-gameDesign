const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [LoginScene, GameLobbyScene, GameScene],
  dom: {
    createContainer: true
  }
};

const game = new Phaser.Game(config);