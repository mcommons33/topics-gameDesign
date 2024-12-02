const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    dom: {
        createContainer: true  // Enable DOM elements
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [LoginScene, LobbyScene, GameScene]
};

const game = new Phaser.Game(config);