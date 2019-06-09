// global game state enum
var state = {
    menu: 0,
    paused: 1,
    running: 2
};

class main {
    static setup() {
        // center of screen coordinates
        this.x = round(width / 2);
        this.y = round(height / 2);

        // set the game state to the main menu
        this.state = state.menu;
        // shows debug messages and pathing information
        this.debug = false;

        this.main_menu = new main_menu();
        this.paused_menu = new paused_menu();

        this.reset();
    }

    static update() {
        if (this.state == state.running) {
            stars.update();
            projectile_manager.update();
            ship_manager.update();
        } else if (this.state == state.paused) {
            this.paused_menu.update();
        } else {
            stars.update();
            projectile_manager.update();
            this.main_menu.update();
        }

        // draw the scene
        this.draw();
    }

    static draw() {
        stars.draw();
        projectile_manager.draw();

        if (this.state == state.running) {
            ship_manager.draw();
        } else if (this.state == state.paused) {
            ship_manager.draw();
            this.paused_menu.draw();
        } else {
            this.main_menu.draw();
        }
    }

    static reset() {
        // reset projectiles
        projectile_manager.setup();
        // reset ships
        ship_manager.setup();
        // reset stars
        stars.setup();
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
        text("Position: (" + round(position.x) + ", " + round(position.y) + ")", 2, 12);
        // number of asteroids
        text("Asteroids: " + projectile_manager.asteroids.length, 2, 27);
        // number of lasers
        text("Lasers: "  + projectile_manager.lasers.length, 2, 42);
        // number of ships
        text("Ships: " + ship_manager.ships.length, 2, 57);
        // number of stars
        text("Stars: " + stars.stars.length, 2, 72);
    }
}

function keyPressed() {
    // toggle the debug mode
    if (keyCode == CONTROL) {
        main.debug = !main.debug;

        // show the cursor when in debug mode or on a menu, hide otherwise
        if (main.debug || main.state == state.menu || main.state == state.paused) {
            cursor();
        } else {
            noCursor();
        }
    }

    // pause/unpause the game if escape is pressed
    if (keyCode == 27) {
        // make sure the game has actually started
        if (main.state != state.menu) {
            if (main.state == state.paused) {
                main.state = state.running;

                // hide if cursor if debug mode is not enabled
                if (!main.debug) {
                    noCursor();
                }
            } else {
                main.state = state.paused;

                // show the cursor
                cursor();
            }
        }
    }
}