class alien extends ship {
    constructor(x, y) {
        super(allegiance.enemy, round(random(50, 150)), createVector(x, y));

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

            // get a new target if the alien has reached its current target
            if (this.position.dist(this.target) < 50) {
                this.target = this.get_random_location();
            }
            
            this.bounds.position = this.position;
        }

        super.update();
        this.rotation_velocity = 0;

        // remove the alien if it's too far away from the player
        let position = ship_manager.player.position;
        if (this.remove || this.position.dist(position) > 2000) {
            ship_manager.aliens.splice(ship_manager.aliens.indexOf(this), 1);
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

        super.draw(200, 30, 30);
    }

    // gets a random location near the player
    get_random_location() {
        let position = ship_manager.player.position;
        return createVector(
            position.x + ((random() - 0.5) * 300),
            position.y + ((random() - 0.5) * 300));
    }
}