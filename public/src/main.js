// main.js

// Create a Phaser configuration object
const config = {
    type: Phaser.AUTO,
    width: 800,   // Width of the game canvas
    height: 600,  // Height of the game canvas
    parent: 'game-container', // The ID of the DOM element to add the canvas to
    scene: [LoginScene, GameScene], // The scenes we'll define next
  };

  // Define the GameScene
class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload() {
      // Load any assets if needed
    }
  
    create() {
      // Retrieve the username from localStorage
      const username = localStorage.getItem('username') || 'Player';
  
      // Display the username on the screen
      this.add.text(10, 10, `Welcome, ${username}!`, { fontSize: '24px', color: '#FFFFFF' });
  
      // Here you can start building your game...
    }
  }
  

// Define the LoginScene
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
      const startButton = this.add.text(400, 400, 'Start Game', { fontSize: '32px', color: '#FFFFFF', backgroundColor: '#0000FF' })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive();
  
      // Handle button click
      startButton.on('pointerdown', () => {
        const inputText = element.getChildByName('username').value;
        if (inputText !== '') {
          // Store the username in localStorage
          localStorage.setItem('username', inputText);
  
          // Start the GameScene
          this.scene.start('GameScene');
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
  
  // Create a new Phaser Game instance
  const game = new Phaser.Game(config);
  