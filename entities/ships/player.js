class player extends ship {
    constructor(x, y) {
        super(faction.friendly, 7, createVector(x, y));

        this.health = 100;
        this.score = 0;

        this.bounds = {
            position: this.position,
            width: 14,
            height: 14
        }
    }

    update() {
        super.update();
        if (!this.destroyed) {
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
    }

    draw() {
        let current_color = color(40, 40, 200);
        super.draw(current_color);

        if (!this.destroyed) {
            fill(current_color);
            noStroke();
            push();
            translate(this.position.x, this.position.y);
            rotate(this.rotation.heading());
            triangle(7, 0, -7, -7, -7, 7);
            pop();
        }
    }

    change_health(amount) {
        if (!main.debug) {
            super.change_health(amount);
        }

        if (amount < 0 && this.invincibility == 0) {
            this.invincibility = 20;
        }

        if (this.health > 100) {
            this.health = 100;
        } else if (this.health <= 0) {
            main.state = state.death;
            cursor();
        }
    }
}