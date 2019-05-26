// global faction enum
var faction = {
    neutral: 0,
    friendly: 1,
    enemy: 2
}


class entity {
    constructor(faction, position) {
        this.faction = faction;

        this.position = position;
        this.velocity = createVector();
        this.acceleration = createVector();
        this.limit = 7;
        this.rotation = createVector(1, 0);
        this.rotation_velocity = 0;

        this.destroyed = false;

        this.explosion = [];
    }

    update() {
        if (!this.destroyed) {
            // update the rotation
            this.rotation.rotate(this.rotation_velocity);
            
            // apply drag so the entity eventually stops moving
            this.apply_force(this.velocity.copy().mult(-0.01));
            // move the entity
            this.move();
        } else {
            let remove = true;

            for (let particle of this.explosion) {
                // update the particle
                particle.position.add(particle.velocity);
                particle.rotation += particle.rotation_velocity;
                particle.opacity -= particle.decay;

                // check if the explosion can be removed
                if (particle.opacity > 0) {
                    remove = false;
                }
            }

            this.remove = remove;
        }
    }

    draw(r, g, b) {
        // draw the explosion if there is one
        for (let particle of this.explosion) {
            noStroke();
            fill(r, g, b, particle.opacity);

            // draw the particle
            push();
            translate(particle.position.x, particle.position.y);
            rotate(particle.rotation);

            // draw the particle based on the type
            if (particle.type == 0) {
                circle(0, 0, particle.size);
            } else if (particle.type == 1) {
                rect(0, 0, particle.size, particle.size);
            } else {
                stroke(r, g, b, particle.opacity);
                line(0, 0, particle.size, 0);
            }
            pop();
        }
    }

    apply_force(force) {
        this.acceleration.add(force);
    }

    move() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.limit);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    destroy() {
        this.destroyed = true;

        // create the death explosion
        this.explosion = [];
        for (let index = 0; index < round(random(5, 15)); index++) {
            // set global piece arguments
            let particle = {
                // circle, square or line
                type: round(random(0, 2)),
                position: this.position.copy(),
                velocity: createVector(random(-1, 1) , random(-1, 1)),
                rotation: 0,
                rotation_velocity: random(2, 8),
                opacity: 255,
                decay: random(3, 5)
            };

            // add additional arguments based on type
            if (particle.type == 0) {
                // circle size
                particle.size = random(3, 5);
            } else if (particle.type == 1) {
                // rectangle bounds
                particle.size = random(5, 7);
            } else {
                // line length
                particle.size = random(6, 8);
            }

            this.explosion.push(particle);
        }
    }

    // removes an instance of an entity from its corresponding manager
    remove_instance(array, instance) {
        array.splice(array.indexOf(instance), 1);
    }
}