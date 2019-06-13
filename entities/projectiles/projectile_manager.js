class projectile_manager {
    static setup() {
        this.lasers = [];
        this.asteroids = [];

        // generate asteroids for the main menu
        for (let index = 0; index < 25; index++) {
            // make sure the asteroid is not near the menu bounds
            let location;
            do {
                location = createVector(random(0, width), random(0, height));
            } while (location.dist(main.main_menu.background.position) < 300);

            this.create_asteroid(location, round(random(1, 3)));
        }
    }

    static update() {
        let check_removal = (projectiles) => {
            for (let projectile of projectiles) {
                let player = ship_manager.player;
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
                            if (utils.check_collision(ship.bounds, projectile.bounds)) {
                                ship.destroy();
                                projectile.destroy();

                                // add score if a friendly laser hit an enemy
                                if (projectile.faction == faction.friendly) {
                                    let type = ship.constructor.name;

                                    // add health and score when killing an enemy ship
                                    if (type == "corvette") {
                                        player.change_health(5);
                                        player.score += 75;
                                    } else {
                                        player.change_health(15);
                                        player.score += 200;
                                    }
                                }
                            }
                        }
                    }
                }

                // check if a projectile hit the player
                if (projectile.faction != faction.friendly) {
                    if (!projectile.destroyed) {
                        if (utils.check_collision(player.bounds, projectile.bounds)) {
                            // check if the player has i-frames
                            if (player.invulnerability == 0) {
                                let amount = 15;
                                let type = projectile.constructor.name;
                                if (type == "asteroid") {
                                    let size = projectile.size;
                                    // handle asteroid damage
                                    if (size == 2) {
                                        amount = 40
                                    } else {
                                        amount = 75;
                                    }
                                } else if (type == "laser") {
                                    // handle lasers
                                    if (projectile.type == "light") {
                                        amount = 20;
                                    } else {
                                        amount = 60;
                                    }
                                }
                                
                                projectile.destroy();
                                player.invulnerability = 20;
                                player.change_health(-amount);
                            }
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

        for (let asteroid of this.asteroids) {
            // check if lasers hit any asteroids
            for (let laser of this.lasers) {
                if (!laser.destroyed && !asteroid.destroyed) {
                    if (utils.check_collision(asteroid.bounds, laser.bounds)) {
                        asteroid.destroy();
                        laser.destroy();

                        // add score if the laser belongs to the player
                        if (laser.faction == faction.friendly) {
                            ship_manager.player.score += asteroid.size * 10;
                        }
                    }
                }
            }

            // check if asteroids are under the main menu
            if (main.state == state.menu) {
                let bounds = main.main_menu.background;
                if (utils.check_collision(asteroid.bounds, bounds)) {
                    if (!asteroid.destroyed) {
                        asteroid.destroy();
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