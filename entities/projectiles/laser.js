class laser extends projectile {
    constructor(faction, position, target) {
        super(faction, position, target);

        this.limit = 20;
        this.bounds = {
            position: this.position,
            width: 20,
            height: 0
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
        if (this.faction == allegiance.friendly) {
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
        line(0, 0, this.bounds.width, this.bounds.height);
        pop();
    }
}