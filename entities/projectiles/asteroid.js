class asteroid extends projectile {
    constructor(position, size, target) {
        super(faction.neutral, position, target);

        this.size = size;

        this.dimensions = 10 * size;
        this.bounds = {
            width: this.dimensions,
            height: this.dimensions
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

        // center the bounds on the texture (rectMode CENTER vs CORNER)
        let amount = this.dimensions / 2;
        this.bounds.position = this.position.copy().sub(amount, amount);

        if (this.destroyed && !this.split) {
            this.split = true;
            if (this.size != 1) {
                let amount = round(this.size == 3 ? random(1, 2) : random(2, 4));
                for (let index = 0; index < amount; index++) {
                    projectile_manager.create_asteroid(this.position.copy(), this.size - 1,);
                }
            }
        }

        if (this.remove) {
            this.remove_instance(projectile_manager.asteroids, this);
        }
    }

    draw() {
        let current_color = color(70, 60, 40);
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
            fill(current_color);

            // draw the asteroid
            push();
            translate(this.position.x, this.position.y);
            rotate(this.rotation.heading());
            rect(0, 0, this.bounds.width, this.bounds.height);
            pop();
        }

        super.draw(current_color);
    }
}