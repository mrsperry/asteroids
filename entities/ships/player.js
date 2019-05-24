class player extends ship {
    constructor(x, y) {
        super(allegiance.friendly, 7, createVector(x, y));
    }

    update() {
        // handle movement
        // left - a
        if (keyIsDown(65)) {
            this.rotation_velocity -= 0.5;
        }
        // right - d
        if (keyIsDown(68)) {
            this.rotation_velocity += 0.5;
        }
        // up - w
        if (keyIsDown(87)) {
            this.apply_force(this.rotation.copy().mult(0.1));
        }
        // down - s
        if (keyIsDown(83)) {
            this.apply_force(this.rotation.copy().mult(-0.1));
        }

        super.update();

        // handle shooting when pressing space or left clicking
        if (keyIsDown(32) || mouseIsPressed) {
            super.fire();
        }

        // cap rotation velocity
        if (this.rotation_velocity > 2.5) {
            this.rotation_velocity = 2.5;
        } else if (this.rotation_velocity < -2.5) {
            this.rotation_velocity = -2.5;
        }
        // apply drag to the rotation velocity
        this.rotation_velocity += this.rotation_velocity < 0 ? 0.1 : -0.1;
        // clamp the rotation velocity
        if (this.rotation_velocity > -0.15 && this.rotation_velocity < 0.15) {
            this.rotation_velocity = 0;
        }
    }

    draw() {
        super.draw(40, 40, 200);
    }
}