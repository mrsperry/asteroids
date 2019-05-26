class asteroid extends projectile {
    constructor(position, target) {
        super(allegiance.neutral, position, target);

        this.bounds = {
            position: this.position,
            width: 10,
            height: 10
        };

        // set a constant force
        this.force = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
        // set a constant rotation
        if (round(random()) == 0) {
            this.rotation_constant = random(0.5, 3);
        } else {
            this.rotation_constant = random(-0.5, -3);
        }
    }

    update() {
        this.apply_force(this.force);
        this.rotation_velocity += this.rotation_constant;

        super.update();
        this.rotation_velocity = 0;

        if (this.remove) {
            this.remove_instance(projectile_manager.asteroids, this);
        }
    }

    draw() {
        if (!this.destroyed) {
            // create the asteroids path
            if (main.debug) {
                stroke(255, 25);
                push();
                translate(this.position.x, this.position.y);
                rotate(this.velocity.heading());
                line(0, 0, 500, 0);
                pop();
            }

            noStroke();
            fill(70, 60, 40);

            // draw the asteroid
            push();
            translate(this.position.x, this.position.y);
            rotate(this.rotation.heading());
            rect(0, 0, this.bounds.width, this.bounds.height);
            pop();
        }

        super.draw(70, 60, 40);
    }
}