// global laser type enum
var laser_type = {
    light: 0,
    heavy: 1
};

class laser extends projectile {
    constructor(faction, type, position, target) {
        super(faction, position, target);

        this.type = type;
        this.limit = this.type == laser_type.light ? 20 : 4;

        this.bounds = {
            position: this.position,
            width: 20,
            height: this.type == laser_type.light ? 0 : 20
        };
    }

    update() {
        super.update();

        this.apply_force(this.target.copy().mult(20));

        if (this.remove) {
            this.remove_instance(projectile_manager.lasers, this);
        }
    }

    draw() {
        let current_color;
        if (this.faction == faction.friendly) {
            // friendly lasers are blue
            current_color = color(100, 160, 240);
        } else {
            // enemy lasers are red
            current_color = color(240, 105, 105);
        }

        if (!this.destroyed) {
            stroke(current_color);
            noFill();

            push();
            // go to current location
            translate(
                this.position.x + cos(this.target.heading()), 
                this.position.y + sin(this.target.heading()));
            // rotate line based on the ship direction
            rotate(this.target.heading());
            // draw the laser
            rect(0, 0, this.bounds.width, this.bounds.height);
            pop();
        } else {
            super.draw(current_color);
        }
    }

    destroy() {
        this.destroyed = true;

        this.explosion = [];
        for (let index = 0; index < 4; index++) {
            this.explosion.push({
                // only circle type
                type: 0,
                size: 1,
                position: this.position.copy(),
                velocity: createVector(random(-1, 1) , random(-1, 1)),
                rotation: 0,
                rotation_velocity: 0,
                opacity: 255,
                decay: 5
            });
        }
    }
}