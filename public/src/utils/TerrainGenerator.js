class TerrainGenerator {
  constructor(scene) {
      this.scene = scene;
  }

  generateTerrain() {
      const terrainGroup = this.scene.physics.add.staticGroup();

      // Generate random obstacles
      const types = [
          { color: 0x808080, name: 'rock', minSize: 50, maxSize: 150 },
          { color: 0x355E3B, name: 'tree', minSize: 30, maxSize: 60 },
          { color: 0x8B4513, name: 'wall', minSize: 100, maxSize: 300 }
      ];

      // Generate each type of obstacle
      types.forEach(type => {
          const count = Phaser.Math.Between(10, 20);
          for (let i = 0; i < count; i++) {
              const x = Phaser.Math.Between(100, this.scene.physics.world.bounds.width - 100);
              const y = Phaser.Math.Between(100, this.scene.physics.world.bounds.height - 100);
              const width = Phaser.Math.Between(type.minSize, type.maxSize);
              const height = type.name === 'tree' ? width : Phaser.Math.Between(type.minSize, type.maxSize);

              const obstacle = this.scene.add.rectangle(x, y, width, height, type.color);
              this.scene.physics.add.existing(obstacle, true);
              terrainGroup.add(obstacle);
          }
      });

      return terrainGroup;
  }

  addDecorations(terrainGroup) {
      // Add small decorative elements
      const decorations = this.scene.add.group();
      
      for (let i = 0; i < 100; i++) {
          const x = Phaser.Math.Between(50, this.scene.physics.world.bounds.width - 50);
          const y = Phaser.Math.Between(50, this.scene.physics.world.bounds.height - 50);
          
          // Check if position is clear
          const overlap = false;
          terrainGroup.getChildren().forEach(terrain => {
              const bounds = terrain.getBounds();
              if (bounds.contains(x, y)) {
                  overlap = true;
              }
          });

          if (!overlap) {
              const decoration = this.scene.add.circle(x, y, 3, 0x355E3B, 0.5);
              decorations.add(decoration);
          }
      }

      return decorations;
  }
}