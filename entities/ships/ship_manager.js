class ship_manager {
    static setup() {
        this.player = new player(main.x, main.y);

        this.aliens = [];
    }

    static update() {
        // create aliens randomly
        if (this.aliens.length < 5 && round(random(0, 10)) == 0) {
            let position = utils.get_random_location();
            this.aliens.push(new alien(position.x, position.y));
        }

        // update the player
        this.player.update();

        // update the aliens
        for (let alien of this.aliens) {
            alien.update();
        }
    }

    static draw() {
        // draw the aliens
        for (let alien of this.aliens) {
            alien.draw();
        }

        // draw the player
        this.player.draw();
    }
}