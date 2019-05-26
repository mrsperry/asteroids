class ship_manager {
    static setup() {
        this.player = new player(main.x, main.y);

        this.ships = [];
    }

    static update() {
        // create ships randomly
        if (this.ships.length < 5 && round(random(0, 10)) == 0) {
            let position = utils.get_random_location();
            this.ships.push(new corvette(faction.neutral, position.x, position.y));
        }

        // update the player
        this.player.update();

        // update the ships
        for (let ship of this.ships) {
            ship.update();
        }
    }

    static draw() {
        // draw the ships
        for (let ship of this.ships) {
            ship.draw();
        }

        // draw the player
        this.player.draw();
    }
}