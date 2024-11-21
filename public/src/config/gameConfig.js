const GameConfig = {
  WORLD: {
      WIDTH: 3200,
      HEIGHT: 2400,
      GRAVITY: 0,
  },

  PLAYER: {
      SPEED: 300,
      SPRINT_MULTIPLIER: 1.5,
      HEALTH: 100,
      MAX_ARMOR: 100,
      SIZE: 20,
      COLORS: {
          DEFAULT: 0x00ff00,
          DAMAGED: 0xff0000,
          HEALING: 0x00ffff,
      },
  },

  WEAPONS: {
      PICKUP_RANGE: 50,
      RELOAD_TIME: 2000,
  },

  SAFE_ZONE: {
      INITIAL_RADIUS_RATIO: 0.8,
      MIN_RADIUS: 200,
      SHRINK_RATE: 0.3,
      DAMAGE_RATE: 1,
      WARNING_TIME: 5000,
  },

  UI: {
      HEALTH_BAR: {
          WIDTH: 200,
          HEIGHT: 20,
          PADDING: 10,
      },
      MINIMAP: {
          SIZE: 150,
          SCALE: 0.1,
      },
  },

  DEBUG: {
      ENABLED: false,
      SHOW_HITBOXES: false,
      SHOW_FPS: true,
  }
};