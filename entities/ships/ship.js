class ship extends entity {
    constructor(faction, cooldown, position) {
        super(faction, position);

        this.cooldown = cooldown;
        this.weapon_cooldown = 0;

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

        // handle trail
        let removal = [];
        for (let bubble of this.trail) {
            bubble.position.add(bubble.velocity);
            bubble.velocity.mult(0.7);
            bubble.size += 0.1;
            bubble.opacity -= 5;

            if (bubble.opacity == 0) {
                removal.push(bubble);
            }
        }
        
        // remove excess bubbles
        for (let bubble of removal.reverse()) {
            this.trail.splice(this.trail.indexOf(bubble), 1);
        }

        super.update();
    }

    draw(color) {
        noFill();
        noStroke();

        if (!this.destroyed) {
            // draw the trail below the ship
            for (let bubble of this.trail) {
                // set the bubble opacity
                stroke(255, bubble.opacity);

                noFill();
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
        this.trail.push({
            position: this.position.copy(),
            velocity: this.rotation.copy().mult(10).mult(-1).add(random(-3, 3), random(-3, 3)),
            size: 0,
            opacity: 255
        });
    }

    fire() {
        // only fire if the weapon isn't on cooldown
        if (this.weapon_cooldown == 0) {
            this.weapon_cooldown = this.cooldown;
            
            // create a new laser
            projectile_manager.create_laser(this.faction, this.position.copy(), this.rotation.copy());
        }
    }
}