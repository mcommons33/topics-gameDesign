class ParticleManager {
  constructor(scene) {
      this.scene = scene;
      this.activeEmitters = new Map();
  }

  createMuzzleFlash(x, y, rotation) {
      const particles = this.scene.add.particles(0xffff00);
      
      const emitter = particles.createEmitter({
          speed: { min: 100, max: 200 },
          angle: {
              min: rotation - Math.PI/6,
              max: rotation + Math.PI/6
          },
          scale: { start: 0.5, end: 0 },
          blendMode: 'ADD',
          lifespan: 100,
          quantity: 20
      });

      emitter.setPosition(x, y);
      
      this.scene.time.delayedCall(100, () => {
          particles.destroy();
      });
  }

  createBulletImpact(x, y) {
      const particles = this.scene.add.particles(0xffffff);
      
      const emitter = particles.createEmitter({
          speed: { min: 50, max: 150 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.4, end: 0 },
          blendMode: 'ADD',
          lifespan: 200,
          quantity: 15
      });

      emitter.setPosition(x, y);
      
      this.scene.time.delayedCall(200, () => {
          particles.destroy();
      });
  }

  createHealEffect(player) {
      const particles = this.scene.add.particles(0x00ff00);
      
      const emitter = particles.createEmitter({
          follow: player.container,
          speed: { min: 50, max: 100 },
          scale: { start: 0.5, end: 0 },
          blendMode: 'ADD',
          lifespan: 500,
          frequency: 50
      });

      this.scene.time.delayedCall(1000, () => {
          particles.destroy();
      });
  }

  createArmorEffect(player) {
      const particles = this.scene.add.particles(0x4169E1);
      
      const emitter = particles.createEmitter({
          follow: player.container,
          speed: { min: 50, max: 100 },
          scale: { start: 0.5, end: 0 },
          blendMode: 'ADD',
          lifespan: 500,
          frequency: 50
      });

      this.scene.time.delayedCall(1000, () => {
          particles.destroy();
      });
  }

  createSpeedEffect(player) {
      const particles = this.scene.add.particles(0xffff00);
      
      const emitter = particles.createEmitter({
          follow: player.container,
          speed: { min: 50, max: 100 },
          scale: { start: 0.2, end: 0 },
          blendMode: 'ADD',
          frequency: 30,
          lifespan: 200
      });

      return particles;
  }

  createPickupEffect(x, y, color) {
      const particles = this.scene.add.particles(color);
      
      const emitter = particles.createEmitter({
          x: x,
          y: y,
          speed: { min: 100, max: 200 },
          angle: { min: 0, max: 360 },
          scale: { start: 0.6, end: 0 },
          blendMode: 'ADD',
          lifespan: 500,
          quantity: 20
      });

      this.scene.time.delayedCall(500, () => {
          particles.destroy();
      });
  }
}