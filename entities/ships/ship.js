class ship extends entity {
    constructor(faction, cooldown, position) {
        super(faction, position);

        this.cooldown = cooldown;
        this.weapon_cooldown = 0;

        this.speed_particles = [];
        this.trail = [];

        if (this.bounds != null) {
            this.bounds.position = position;
        } else {
            this.bounds = {
                position: position
            };
        }
    }

    update() {
        // decrement weapon cooldown until it's 0
        if (this.weapon_cooldown > 0) {
            this.weapon_cooldown--;
        }
        
        // handle speed particles
        for (let particle of this.speed_particles.reverse()) {
            particle.position.add(particle.velocity);
            particle.opacity -= 5;

            if (particle.opacity == 0) {
                this.speed_particles.splice(this.speed_particles.indexOf(particle), 1);
            }
        }

        // handle trail
        for (let bubble of this.trail.reverse()) {
            bubble.position.add(bubble.velocity);
            bubble.velocity.mult(0.7);
            bubble.size += 0.1;
            bubble.opacity -= 5;

            if (bubble.opacity == 0) {
                this.trail.splice(this.trail.indexOf(bubble), 1);
            }
        }

        super.update();
    }

    draw(color) {
        noFill();

        if (!this.destroyed) {
            // draw the trail below the ship
            for (let bubble of this.trail) {
                // set the bubble opacity
                stroke(255, bubble.opacity);

                // draw the bubble
                circle(bubble.position.x, bubble.position.y, bubble.size);
            }

            if (main.debug) {
                push();
                translate(this.position.x, this.position.y);
                rotate(this.rotation.heading());
                // draw a line indicating -rotation
                stroke(255, 0, 0);
                line(0, 0, -30, 1);
                pop();
            }
        }

        super.draw(color);
    }

    move() {
        super.move();

        // create a trail
        if (frameCount % 2 == 0) {
            this.trail.push({
                position: this.position.copy(),
                velocity: this.rotation.copy().mult(10).mult(-1).add(random(-3, 3), random(-3, 3)),
                size: 0,
                opacity: 255
            });
        }
    }

    fire() {
        // only fire if the weapon isn't on cooldown
        if (this.weapon_cooldown == 0) {
            this.weapon_cooldown = this.cooldown;
            
            // create a new laser
            projectile_manager.create_laser(
                this.faction,
                laser_type.light,
                this.position.copy().add(15 * cos(this.rotation.heading()), 15 * sin(this.rotation.heading())), 
                this.rotation.copy().add(random(-0.025, 0.025), random(-0.025, 0.025)));
        }
    }
}