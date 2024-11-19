// loginScene.js

class LoginScene extends Phaser.Scene {
    constructor() {
      super({ key: 'LoginScene' });
    }
  
    preload() {
      // Load any assets if needed
    }
  
    create() {
      // Add a background color
      this.cameras.main.setBackgroundColor('#24252A');
  
      // Add a text prompt
      this.add.text(400, 200, 'Enter Your Username:', { fontSize: '32px', color: '#FFFFFF' }).setOrigin(0.5);
  
      // Create an HTML input element
      const element = this.add.dom(400, 300).createFromHTML('<input type="text" name="username" placeholder="Username">');
  
      // Create a "Start Game" button
      const startButton = this.add.text(400, 400, 'Continue', { fontSize: '32px', color: '#FFFFFF', backgroundColor: '#0000FF' })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive();
  
      // Handle button click
      startButton.on('pointerdown', () => {
        const inputText = element.getChildByName('username').value;
        if (inputText !== '') {
          // Store the username in localStorage
          localStorage.setItem('username', inputText);
  
          // Start the GameLobbyScene
          this.scene.start('GameLobbyScene');
        } else {
          // Prompt the user to enter a username
          alert('Please enter a username!');
        }
      });
  
      // Handle button hover effects
      startButton.on('pointerover', () => {
        startButton.setStyle({ backgroundColor: '#ff0000' });
      });
  
      startButton.on('pointerout', () => {
        startButton.setStyle({ backgroundColor: '#0000FF' });
      });
    }
  }
  