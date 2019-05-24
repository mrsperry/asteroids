class utils {
    // handles collision detection
    static collision(entity, projectile) {
        let target = entity.bounds;
        let missile = projectile.bounds;

        // check if the projectile intersects the entity
        return target.position.x < missile.position.x + missile.width
            && target.position.x + target.width > missile.position.x
            && target.position.y < missile.position.y + missile.height
            && target.position.y + target.height > missile.position.y;
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
}