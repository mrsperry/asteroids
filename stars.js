class stars {
    static setup() {
        this.stars = [];

        for (let index = 0; index < 25; index++) {
            stars.add_star();
        }
    }

    static update() {
        if (this.stars.length < 100) {
            this.add_star();
        }
    }

    static draw() {
        for (let star of this.stars) {
            let levels = star.color.levels;
            if (levels[3] < 0 || utils.check_bounds(star.position)) {
                this.stars.splice(this.stars.indexOf(star), 1);
                continue;
            } else if (levels[3] >= star.max_opacity) {
                if (!star.fading) {
                    star.opacity_change *= -1;
                    star.fading = true;
                }
            }

            if (ship_manager.player.position.dist(star.position) > 1000) {
                star.opacity_change--;
            }

            levels[3] += star.opacity_change;
            noStroke();
            fill(levels[0], levels[1], levels[2], levels[3]);
            circle(star.position.x, star.position.y, star.size);
        }
    }

    static add_star() {
        let start = ship_manager.player.position.copy().sub(main.x + 30, main.y + 30);
        this.stars.push({
            position: createVector(
                random(start.x, start.x + width + 60), 
                random(start.y, start.y + height + 60)),
            color: color(random(230, 255), random(230, 255), random(230, 255), 0),
            max_opacity: random(150, 230),
            opacity_change: random(0, 3),
            size: random(0.5, 2)
        });
    }
}