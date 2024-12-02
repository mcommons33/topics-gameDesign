class LoginScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginScene' });
    }

    create() {
        // Add background color
        this.cameras.main.setBackgroundColor('#24252A');

        // Create login form using DOM element
        const loginForm = `
            <div style="text-align: center;">
                <input type="text" id="username" name="username" placeholder="Enter username" style="padding: 10px; width: 200px; margin: 10px; font-size: 16px;">
                <br>
                <button id="startButton" style="padding: 10px 20px; margin: 10px; font-size: 16px; background-color: #4CAF50; color: white; border: none; cursor: pointer;">Start Game</button>
            </div>
        `;

        // Add the login form to the game
        const element = this.add.dom(400, 300).createFromHTML(loginForm);
        element.setOrigin(0.5);

        // Add title text above the form
        this.add.text(400, 200, 'Battle Royale', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Add event listener using Phaser's DOM event handling
        element.addListener('click');
        element.on('click', (event) => {
            if (event.target.id === 'startButton') {
                const username = element.getChildByName('username');
                if (username.value !== '') {
                    localStorage.setItem('username', username.value);
                    this.scene.start('LobbyScene');
                }
            }
        });
    }
}