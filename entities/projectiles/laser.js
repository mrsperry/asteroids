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

        if (this.destroyed) {
            this.remove_instance(projectile_manager.lasers, this);
        }
    }

    draw() {
        if (this.faction == faction.friendly) {
            // friendly lasers are blue
            stroke(100, 160, 240);
        } else {
            // enemy lasers are red
            stroke(240, 105, 105);
        }
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
    }
}