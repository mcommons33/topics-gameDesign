class Entity {
  constructor(scene, x, y, type) {
      this.scene = scene;
      this.type = type;
      this.id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Properties for networking
      this.position = { x, y };
      this.rotation = 0;
      this.lastUpdateTime = Date.now();
  }

  getState() {
      return {
          id: this.id,
          type: this.type,
          position: this.position,
          rotation: this.rotation,
          timestamp: Date.now(),
      };
  }

  setState(state) {
      this.position = state.position;
      this.rotation = state.rotation;
      this.lastUpdateTime = state.timestamp;
  }

  destroy() {
      if (this.sprite) {
          this.sprite.destroy();
      }
  }
}