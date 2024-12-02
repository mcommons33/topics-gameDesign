class LobbyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LobbyScene' });
    }

    create() {
        // Display welcome message
        const username = localStorage.getItem('username') || 'Player';
        this.add.text(400, 200, `Welcome, ${username}!`, {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Add start game button
        const startButton = this.add.text(400, 300, 'Start Game', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#4a4',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive();

        // Handle button click
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        // Change color on hover
        startButton.on('pointerover', () => {
            startButton.setBackgroundColor('#6c6');
        });

        startButton.on('pointerout', () => {
            startButton.setBackgroundColor('#4a4');
        });
    }
}