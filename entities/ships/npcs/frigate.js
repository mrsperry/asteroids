class frigate extends npc {
    constructor(x, y) {
        super(round(random(300, 400)), createVector(x, y));

        this.secondary_cooldown = 0;
        this.tertiary_cooldown = 0;

        this.health = 120;
        this.bounds = {
            position: this.position,
            width: 50,
            height: 20
        };
    }

    update() {
        if (!this.destroyed) {
            this.fire();

            if (this.secondary_cooldown > 0) {
                this.secondary_cooldown--;
            }
            if (this.tertiary_cooldown > 0) {
                this.tertiary_cooldown--;
            }
        }

        super.update();
    }

    draw() {
        let current_color = npc.get_color(this.faction);
        super.draw(current_color);

        if (!this.destroyed) {
            fill(current_color);
            noStroke();
            push();
            translate(this.position.x, this.position.y);
            rotate(this.rotation.heading());

            rectMode(CORNER);
            // create the frigate shape
            // rear engines
            rect(-20, -10, 10, 5);
            rect(-20, 5, 10, 5);
            rect(-25, -5, 6, 10);
            // main body (1px larger than normal to fix a p5 border overlap issue)
            rect(-20, -8, 41, 16);
            // front end
            rect(20, -10, 7, 20);
            // left side guns
            circle(-2, -9, 2);
            circle(4, -9, 2);
            circle(10, -9, 2);
            // right side guns
            circle(-2, 9, 2);
            circle(4, 9, 2);
            circle(10, 9, 2);
            pop();
        }
    }

    fire() {
        // primary heavy laser
        if (this.weapon_cooldown == 0) {
            this.weapon_cooldown = this.cooldown;
                
            projectile_manager.create_laser(
                this.faction,
                laser_type.heavy,
                this.position.copy(), 
                this.rotation.copy());
        }

        // secondary grapeshot
        if (this.secondary_cooldown == 0) {
            // get the players position
            let position = ship_manager.player.position.copy();
            // find the angle between the player and the frigate
            let angle = atan2(
                position.y - this.position.y, 
                position.x - this.position.x);
            // determine which side to fire from
            let offset;
            if (angle >= 45 && angle <= 135) {
                offset = 12;
            } else if (angle <= -45 && angle >= -135) {
                offset = -12;
            } else {
                return;
            }
            // get the laser heading
            let heading = position.sub(this.position);

            this.secondary_cooldown = round(random(100, 150));

            // create the grapeshot
            for (let index = -1; index < 2; index++) {
                projectile_manager.create_laser(
                    this.faction,
                    laser_type.light,
                    this.position.copy().add(4, offset).add(index * 5), 
                    heading.copy());
            }
        }

        // auxillary asteroid defence
        for (let asteroid of projectile_manager.asteroids) {
            if (this.position.dist(asteroid.position) < 100 && !asteroid.destroyed) {
                // draw a debug line to the targeted asteroids
                if (main.debug) {
                    stroke(255);
                    line(
                        this.position.x, 
                        this.position.y, 
                        asteroid.position.x, 
                        asteroid.position.y);
                }

                if (this.tertiary_cooldown == 0) {
                    this.tertiary_cooldown = 35;

                    projectile_manager.create_laser(
                        this.faction,
                        laser_type.light,
                        this.position.copy(), 
                        asteroid.position.copy().sub(this.position.copy()));
                }
            }
        }
    }
}