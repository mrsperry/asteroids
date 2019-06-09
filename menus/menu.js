class menu {
    constructor(title, buttons) {
        this.title = title;
        this.buttons = buttons;

        // center the buttons vertically and horizontally
        let x = main.x - 75;
        let y = main.y - 60 - (this.buttons.length / 2 * 30);

        let end_y = 0;
        for (let index = 0; index < this.buttons.length; index++) {
            let current_y = 40 + (index * 45);
            this.buttons[index].bounds = {
                position: createVector(x, y + current_y),
                width: 150,
                height: 30
            };

            end_y = current_y;
        }

        // set the background bounds
        this.background = {
            position: createVector(x - 30, y - 30),
            width: 210,
            height: end_y + 90
        };
    }

    update() {
        for (let button of this.buttons) {
            // check if the button is being hovered
            if (menu.is_mouse_over(button.bounds)) {
                button.hovered = true;

                // check if the button is being clicked
                if (mouseIsPressed) {
                    // reset the mouse state
                    mouseIsPressed = false;

                    // execute button function
                    button.on_click();
                    return;
                }
            } else {
                button.hovered = false;
            }
        }
    }

    draw() {
        textAlign(CENTER);
        rectMode(CORNER);

        // draw the background
        fill(15);
        let bounds = this.background;
        rect(bounds.position.x, 
            bounds.position.y, 
            bounds.width, 
            bounds.height);

        // draw the title
        fill(255);
        textSize(30);
        let y = bounds.position.y + 40;
        text(this.title, 
            bounds.position.x + round(bounds.width / 2), 
            y);
        stroke(150);
        line(bounds.position.x + 10,
            y + 10, 
            bounds.position.x + bounds.width - 10, 
            y + 10);

        // draw the buttons
        for (let button of this.buttons) {
            bounds = button.bounds;

            // draw the button outline
            stroke(150);
            fill(button.hovered ? 30 : 10);
            rect(bounds.position.x,
                bounds.position.y,
                bounds.width,
                bounds.height);
            
            // draw the text in the center of the button
            fill(255);
            noStroke();
            textSize(12);
            text(button.text, 
                bounds.position.x + round(bounds.width / 2), 
                bounds.position.y + round(bounds.height / 2) + 4);
        }
    }

    static is_mouse_over(bounds) {
        return mouseX >= bounds.position.x
            && mouseX <= bounds.position.x + bounds.width
            && mouseY >= bounds.position.y
            && mouseY <= bounds.position.y + bounds.height;
    }
}