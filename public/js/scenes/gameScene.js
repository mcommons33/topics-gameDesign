class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.playerNameText = null;
        this.weapons = new Map();
        this.ammoText = null;
        this.currentWeapon = null;
        this.isReloading = false;
    }

    preload() {
        // Load images
        this.load.image('rifle', 'assets/rifle.png');
        this.load.image('player_unarmed', 'assets/player_unarmed.png');
        this.load.image('player_armed', 'assets/player_armed.png');
        this.load.image('ammo', 'assets/ammo.png');
    }

    create() {
        // Set world bounds
        this.physics.world.setBounds(0, 0, 1600, 1200);

        // Create player
        this.createPlayer();

        // Create terrain
        this.createTerrain();

        // Spawn weapons
        this.spawnWeapons();

        // Create ammo packs
        this.createAmmoPacks();

        // Set up camera
        this.cameras.main.setBounds(0, 0, 1600, 1200);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        // Add UI elements
        this.createUI();

        // Set up input
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            reload: Phaser.Input.Keyboard.KeyCodes.R,
            pickup: Phaser.Input.Keyboard.KeyCodes.E
        });
    }

    createPlayer() {
        // Create player sprite
        this.player = this.physics.add.sprite(800, 600, 'player_unarmed');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.03);

        // Add player name
        const username = localStorage.getItem('username') || 'Player';
        this.playerNameText = this.add.text(800, 570, username, {
            fontSize: '16px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Initialize player properties
        this.player.health = 100;
        this.player.ammo = 0;
        this.player.maxAmmo = 30;

        this.player.hasGun = false;
    }

    createTerrain() {
        this.terrain = this.physics.add.staticGroup();
        
        // Add some basic obstacles
        const obstacles = [
            { x: 400, y: 300, width: 100, height: 20 },
            { x: 800, y: 500, width: 20, height: 100 },
            { x: 1200, y: 700, width: 100, height: 20 }
        ];

        obstacles.forEach(obs => {
            const obstacle = this.add.rectangle(obs.x, obs.y, obs.width, obs.height, 0x808080);
            this.physics.add.existing(obstacle, true);
            this.terrain.add(obstacle);
        });

        // Add collision with player
        this.physics.add.collider(this.player, this.terrain);
    }

    spawnWeapons() {
        const rifle = this.physics.add.sprite(400, 400, 'rifle');
        rifle.gunType = 'rifle';
        this.weapons.set(rifle, { type: 'rifle', ammo: 30 });

        rifle.setScale(0.1);

        this.physics.add.overlap(this.player, rifle, this.collectWeapon, null, this);
    }

    createAmmoPacks() {
        this.ammoPacks = this.physics.add.group();
        
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(100, 1500);
            const y = Phaser.Math.Between(100, 1100);
            const ammoPack = this.physics.add.sprite(x, y, 'ammo');
            ammoPack.setScale(0.1);
            ammoPack.ammoAmount = 30;
            this.ammoPacks.add(ammoPack);
        }

        this.physics.add.overlap(this.player, this.ammoPacks, this.collectAmmo, null, this);
    }

    createUI() {
        this.ammoText = this.add.text(16, 16, 'Ammo: 0', {
            fontSize: '18px',
            fill: '#fff'
        }).setScrollFactor(0);
    }

    collectWeapon(player, weapon) {
        if (this.cursors.pickup.isDown && !this.currentWeapon) {
            this.currentWeapon = this.weapons.get(weapon);
            this.player.ammo = this.currentWeapon.ammo;
            this.updateAmmoText();
            weapon.destroy();

            this.player.setTexture('player_armed');
            this.player.hasGun = true;
            this.player.setScale(0.3);
        }
    }

    collectAmmo(player, ammoPack) {
        if (this.cursors.pickup.isDown && this.currentWeapon) {
            this.player.ammo += ammoPack.ammoAmount;
            this.updateAmmoText();
            ammoPack.destroy();
        }
    }

    updateAmmoText() {
        this.ammoText.setText(`Ammo: ${this.player.ammo}`);
    }

    shoot() {
        if (this.player.ammo > 0 && !this.isReloading) {
            const bullet = this.add.circle(this.player.x, this.player.y, 4, 0xff0000);
            this.physics.add.existing(bullet);
            
            // Calculate angle to pointer
            const angle = Phaser.Math.Angle.Between(
                this.player.x, this.player.y,
                this.input.activePointer.worldX, this.input.activePointer.worldY
            );

            // Set bullet velocity
            const speed = 800;
            bullet.body.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );

            // Add collision with terrain
            this.physics.add.collider(bullet, this.terrain, () => bullet.destroy());

            // Destroy bullet after 1 second
            this.time.delayedCall(1000, () => bullet.destroy());

            this.player.ammo--;
            this.updateAmmoText();
        }
    }

    update() {
        // Handle player movement
        const speed = 200;
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        }
        if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
        }
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        }
        if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        // Update player name position
        this.playerNameText.setPosition(this.player.x, this.player.y - 30);

        // Handle shooting
        if (this.input.activePointer.isDown && this.currentWeapon) {
            this.shoot();
        }
    }
}