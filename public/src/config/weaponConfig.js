const WeaponConfig = {
  PISTOL: {
      id: 'pistol',
      name: 'Pistol',
      damage: 20,
      fireRate: 400,
      magazineSize: 12,
      reloadTime: 1000,
      bulletSpeed: 800,
      spread: 0.05,
      color: 0xcccccc,
      bulletColor: 0xff0000,
      automatic: false,
  },
  
  SHOTGUN: {
      id: 'shotgun',
      name: 'Shotgun',
      damage: 15,
      fireRate: 800,
      magazineSize: 6,
      reloadTime: 2200,
      bulletSpeed: 600,
      spread: 0.3,
      pellets: 8,
      color: 0x8B4513,
      bulletColor: 0xff4400,
      automatic: false,
  },
  
  RIFLE: {
      id: 'rifle',
      name: 'Assault Rifle',
      damage: 25,
      fireRate: 150,
      magazineSize: 30,
      reloadTime: 1800,
      bulletSpeed: 1000,
      spread: 0.1,
      color: 0x2F4F4F,
      bulletColor: 0xffff00,
      automatic: true,
  }
};

const PowerUpConfig = {
  HEALTH: {
      id: 'health',
      name: 'Health Pack',
      value: 50,
      color: 0x00ff00,
      duration: 0,
      respawnTime: 30000,
  },
  
  ARMOR: {
      id: 'armor',
      name: 'Armor',
      value: 50,
      color: 0x4169E1,
      duration: 0,
      respawnTime: 45000,
  },
  
  SPEED: {
      id: 'speed',
      name: 'Speed Boost',
      multiplier: 1.5,
      color: 0xffff00,
      duration: 10000,
      respawnTime: 60000,
  }
};