class corvette extends npc {
    constructor(faction, x, y) {
        super(faction, round(random(50, 150)), createVector(x, y));
    }
}