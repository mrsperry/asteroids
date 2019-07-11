class utils {
    // handles collision detection
    static check_collision(bounds_1, bounds_2) {
        // check if the projectile intersects the entity
        return bounds_1.position.x < bounds_2.position.x + bounds_2.width
            && bounds_1.position.x + bounds_1.width > bounds_2.position.x
            && bounds_1.position.y < bounds_2.position.y + bounds_2.height
            && bounds_1.position.y + bounds_1.height > bounds_2.position.y;
    }

    static check_bounds(position) {
        // check if the position is outside the screen
        let start = ship_manager.player.position.copy().sub(main.x, main.y);
        return position.x < start.x
            || position.x > start.x + width
            || position.y < start.y
            || position.y > start.y + height;
    }

    // returns a random location outside the screen
    static get_random_location() {
        let x, y;
        // create random offsets
        let x_offset = (width / 2) + random(10, 50);
        let y_offset = (height / 2) + random(10, 50);
        let position = ship_manager.player.position;

        if (round(random()) == 0) {
            x = floor(random(position.x - x_offset, position.x + x_offset));
            y = round(random()) == 0 ? position.y - y_offset : position.y + y_offset;
        } else {
            x = round(random()) == 0 ? position.x - x_offset : position.x + x_offset;
            y = floor(random(position.y - y_offset, position.y + y_offset));
        }
        return createVector(x, y);
    }

    // adds commas to a number where necessary ex: 1000 -> 1,000
    static stringify(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}