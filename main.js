class main {
    static setup() {
        // center of screen coordinates
        this.x = round(width / 2);
        this.y = round(height / 2);

        // shows debug messages and pathing information
        this.debug = false;

        projectile_manager.setup();
        ship_manager.setup();
        stars.setup();
    }

    static update() {
        stars.update();
        projectile_manager.update();
        ship_manager.update();

        // draw the scene
        this.draw();
    }

    static draw() {
        stars.draw();
        projectile_manager.draw();
        ship_manager.draw();
    }
}

function setup() {
    // create the canvas
    createCanvas(windowWidth, windowHeight);

    // initialize variables
    main.setup();

    // initial settings
    rectMode(CENTER);
    angleMode(DEGREES);
    textFont("Consolas");
    noCursor();
}

function draw() {
    background(10);

    push();
    // center the drawing on the player
    let position = ship_manager.player.position;
    translate(-position.x + main.x, -position.y + main.y);
    main.update();
    pop();

    // debug messages
    if (main.debug) {
        stroke(0);
        fill(255);
        // current player position
        let position = ship_manager.player.position;
        text("Position: (" + round(position.x) + ", " + round(position.y) + ")", 2, 12);
        // number of asteroids
        text("Asteroids: " + projectile_manager.asteroids.length, 2, 27);
        // number of lasers
        text("Lasers: "  + projectile_manager.lasers.length, 2, 42);
        // number of ships
        text("Ships: " + ship_manager.ships.length, 2, 57);
        // number of stars
        text("Stars: " + main.stars.length, 2, 72);
    }
}

function keyPressed() {
    // toggle the debug mode
    if (keyCode == CONTROL) {
        main.debug = !main.debug;

        // show the cursor when in debug mode, hide otherwise
        if (main.debug) {
            cursor();
        } else {
            noCursor();
        }
    }
}