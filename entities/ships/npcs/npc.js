class npc extends ship {
    constructor(faction, weapon_cooldown, position) {
        super(faction, weapon_cooldown, position);

        this.target = this.get_random_location();
    }

    update() {
        if (!this.destroyed) {
            super.fire();

            // get the angle the ship needs to move this cycle
            this.difference = this.target.copy().sub(this.position);
            let angle = (this.difference.heading() - this.rotation.heading()) + 180;
            this.rotation_velocity += angle > 180 ? 1 : -1;
            // apply the force
            this.apply_force(this.rotation.copy().mult(0.02));

            // get a new target if the ship has reached its current target
            if (this.position.dist(this.target) < 50) {
                this.target = this.get_random_location();
            }
            
            this.bounds.position = this.position;
        }

        super.update();
        this.rotation_velocity = 0;

        // remove the ship if it's too far away from the player
        let position = ship_manager.player.position;
        if (this.remove || this.position.dist(position) > 2000) {
            ship_manager.ships.splice(ship_manager.ships.indexOf(this), 1);
        }
    }

    draw() {
        // draw the pathing line
        if (main.debug && !this.destroyed) {
            stroke(235, 65, 235, 100);
            line(this.target.x, 
                this.target.y, 
                this.position.x, 
                this.position.y);
        }

        if (this.faction == faction.enemy) {
            super.draw(200, 30, 30);
        } else {
            super.draw(200, 200, 200);
        }
    }

    // gets a random location near the player
    get_random_location() {
        let position = ship_manager.player.position;
        return createVector(
            position.x + ((random() - 0.5) * 300),
            position.y + ((random() - 0.5) * 300));
    }
}