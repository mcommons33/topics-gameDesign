class InputManager {
  constructor(scene) {
      this.scene = scene;
      this.keys = scene.input.keyboard.addKeys({
          W: Phaser.Input.Keyboard.KeyCodes.W,
          A: Phaser.Input.Keyboard.KeyCodes.A,
          S: Phaser.Input.Keyboard.KeyCodes.S,
          D: Phaser.Input.Keyboard.KeyCodes.D,
          SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
          R: Phaser.Input.Keyboard.KeyCodes.R,
          E: Phaser.Input.Keyboard.KeyCodes.E,
          Q: Phaser.Input.Keyboard.KeyCodes.Q,
          SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
      });

      this.mouseInput = {
          isDown: false,
          worldX: 0,
          worldY: 0
      };

      this.setupMouseInput();
  }

  setupMouseInput() {
      this.scene.input.on('pointerdown', () => {
          this.mouseInput.isDown = true;
      });

      this.scene.input.on('pointerup', () => {
          this.mouseInput.isDown = false;
      });

      this.scene.input.on('pointermove', (pointer) => {
          this.mouseInput.worldX = pointer.worldX;
          this.mouseInput.worldY = pointer.worldY;
      });
  }

  getMovementInput() {
      let x = 0;
      let y = 0;

      if (this.keys.A.isDown) x -= 1;
      if (this.keys.D.isDown) x += 1;
      if (this.keys.W.isDown) y -= 1;
      if (this.keys.S.isDown) y += 1;

      return { x, y };
  }

  isReloadPressed() {
      return Phaser.Input.Keyboard.JustDown(this.keys.R);
  }

  isInteractPressed() {
      return Phaser.Input.Keyboard.JustDown(this.keys.E);
  }

  isSprintPressed() {
      return this.keys.SHIFT.isDown;
  }

  isSwitchWeaponPressed() {
      return Phaser.Input.Keyboard.JustDown(this.keys.Q);
  }

  getMouseWorldPosition() {
      return {
          x: this.mouseInput.worldX,
          y: this.mouseInput.worldY
      };
  }

  isShootPressed() {
      return this.mouseInput.isDown;
  }
}