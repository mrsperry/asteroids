class paused_menu extends menu {
    constructor() {
        super("Paused", [
            {
                // unpauses the game
                type: "button",
                text: "Continue Game",
                on_click: () => {
                    if (!main.debug) {
                        noCursor();
                    }
                    // set the game to running
                    main.state = state.running;
                }
            }, 
            {
                // returns to the main menu
                type: "button",
                text: "Main Menu",
                on_click: () => {
                    main.reset();
                    
                    // set the game to the main menu
                    main.state = state.menu;
                }
            }
        ]);
    }

    draw() {
        push();
        // translate to the player's position to keep the menu centered
        let position = ship_manager.player.position;
        translate(position.x - main.x, position.y - main.y);
        super.draw();
        pop();
    }
}