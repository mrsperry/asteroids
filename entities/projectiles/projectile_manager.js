class projectile_manager {
    static setup() {
        this.lasers = [];
        this.asteroids = [];
    }

    static update() {
        let check_removal = (projectiles) => {
            for (let projectile of projectiles) {
                projectile.update();

                // check if a projectile is out of bounds
                let position = projectile.position;
                if (position.dist(ship_manager.player.position) > 2000) {
                    projectiles.splice(projectiles.indexOf(projectile), 1);
                    continue;
                }

                // check if a projectile hit an enemy
                for (let ship of ship_manager.ships) {
                    if (projectile.faction != ship.faction) {
                        if (!ship.destroyed && !projectile.destroyed) {
                            if (utils.collision(ship, projectile)) {
                                ship.destroy();
                                projectile.destroy();
                            }
                        }
                    }
                }

                // check if a projectile hit the player
                if (projectile.faction == faction.enemy
                    || projectile.faction == faction.neutral) {
                    if (!projectile.destroyed) {
                        if (utils.collision(ship_manager.player, projectile)) {
                            // reset the player
                            ship_manager.player = new player(main.x, main.y);
                            ship_manager.ships = [];
                            projectile_manager.asteroids = [];
                            projectile_manager.lasers = [];
                        }
                    }
                }
            }

            return projectiles;
        }

        // create an asteroid if it isn't at the cap
        if (this.asteroids.length < 100) {
            this.create_asteroid(utils.get_random_location(), round(random(1, 3)));
        }

        // check for removals
        this.lasers = check_removal(this.lasers);
        this.asteroids = check_removal(this.asteroids);

        // check if lasers hit any asteroids
        for (let asteroid of this.asteroids) {
            for (let laser of this.lasers) {
                if (!laser.destroyed && !asteroid.destroyed) {
                    if (utils.collision(asteroid, laser)) {
                        asteroid.destroy();
                        laser.destroy();
                    }
                }
            }
        }
    }

    static draw() {
        for (let laser of this.lasers) {
            laser.draw();
        }

        for (let asteroid of this.asteroids) {
            asteroid.draw();
        }
    }

    static create_laser(faction, type, position, target) {
        this.lasers.push(new laser(faction, type, position, target));
    }

    static create_asteroid(position, size) {
        // gets a random target based on its location
        this.asteroids.push(new asteroid(
            position,
            // get a random size
            size, 
            createVector(
                round(random(position.x - 200, position.x + 200)),
                round(random(position.y - 200, position.y + 200)))));
    }
}