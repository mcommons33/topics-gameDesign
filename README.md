# 2D Battle Royale Game
A simple 2D battle royale game built with Phaser 3 and Firebase.

### Quick Start
1. Clone this repository
2. Install Firebase CLI if you haven't:
   bash
   npm install -g firebase-tools
   
3. Login to Firebase:
   bash
   firebase login
   
4. Initialize Firebase in the project directory:
   bash
   firebase init hosting
   
5. Start local development:
   bash
   firebase serve
   

### Project Structure

public/
├── index.html    # Main HTML file
├── style.css     # Basic styling
└── js/
    ├── scenes/   # Game scenes
    │   ├── loginScene.js
    │   ├── lobbyScene.js
    │   └── gameScene.js
    └── main.js   # Game configuration

### Main Components
#### Scenes
- LoginScene: Simple username input
- LobbyScene: Waiting room before game starts
- GameScene: Main gameplay with movement and shooting

### Game Controls
- Movement: WASD keys
- Shoot: Left mouse click
- Reload: R key
- Pick up items: E key

### Technical Details
#### Required Libraries
- Phaser 3 (loaded via CDN in index.html)
- Firebase Hosting (for deployment)

#### Key Features
- Username login
- Basic movement and shooting
- Ammo system with magazine and reserve ammo
- Weapon pickup system
- Simple collision detection

### Development
1. Clone repository
2. Ensure Firebase CLI is installed
3. Run firebase serve in project directory
4. Visit localhost:5000 in your browser

### Deployment
Deploy to Firebase Hosting:
bash
firebase deploy

### Future Development
- Multiplayer functionality
- Damage zone
- Redemtion room on death
- Additional weapons
- More complex map design
- Health and armor systems
- Sprite sheet and terrain

### Resources
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Firebase Documentation](https://firebase.google.com/docs)