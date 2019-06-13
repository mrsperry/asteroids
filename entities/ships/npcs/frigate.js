class frigate extends npc {
    constructor(x, y) {
        super(round(random(300, 400)), createVector(x, y));

        this.secondary_cooldown = 0;
        this.tertiary_cooldown = 0;

        this.health = 120;
        this.bounds = {
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
            rect(0, 0, this.bounds.width, this.bounds.height);
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
            this.secondary_cooldown = round(random(100, 150));

            let position = ship_manager.player.position.copy().sub(this.position);
            for (let index = -1; index < 2; index++) {
                projectile_manager.create_laser(
                    this.faction,
                    laser_type.light,
                    this.position.copy().add(index * 5), 
                    position.copy());
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