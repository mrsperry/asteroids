class main_menu extends menu {
    constructor() {
        super("Asteroids", [
            {
                // stars the game
                text: "Start Game",
                on_click: () => {
                    // set the game state to running
                    main.state = state.running;

                    // remove the cursor if debug mode is not active
                    if (!main.debug) {
                        noCursor();
                    }
                }
            },
            {
                // link to my website
                text: "Other Games",
                on_click: () => {
                    window.open("https://mrsperry.github.io");
                }
            }
        ]);
    }
}