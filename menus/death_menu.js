class death_menu extends menu {
    constructor() {
        super("Game Over", [
            {
                // display the score
                type: "text",
                text: () => {
                    return "Score: " + utils.stringify(ship_manager.player.score);
                }
            },
            {
                // returns to the main menu
                type: "button",
                text: "Main Menu",
                on_click: () => {
                    // reset the pause counter
                    this.pause = 100;
                    // reset entities
                    main.reset();
                    
                    // set the game to the main menu
                    main.state = state.menu;
                }
            }
        ]);

        this.pause = 100;
        this.opacity = 0;
    }

    draw() {
        if (this.pause == 0) {
            push();
            // translate to the player's position to keep the menu centered
            let position = ship_manager.player.position;
            translate(position.x - main.x, position.y - main.y);
            super.draw();
            pop();

            if (this.opacity < 255) {
                this.opacity += 5;
            }
        } else {
            this.pause--;
        }
    }
}