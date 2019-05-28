class corvette extends npc {
    constructor(faction, x, y) {
        super(faction, round(random(50, 150)), createVector(x, y));

        this.bounds = {
            width: 14,
            height: 14
        };
    }

    update() {
        if (!this.destroyed) {
            super.fire();
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
            triangle(7, 0, -7, -7, -7, 7);
            pop();
        }
    }
}