class menu {
    constructor(title, items) {
        this.title = title;
        this.items = items;

        // center the items vertically and horizontally
        let x = main.x - 75;
        let y = main.y - 60 - (this.items.length / 2 * 30);

        let end_y = 0;
        for (let index = 0; index < this.items.length; index++) {
            let current_y = 40 + (index * 45);
            this.items[index].bounds = {
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
        for (let item of this.items) {
            if (item.type == "button") {
                // check if the button is being hovered
                if (menu.is_mouse_over(item.bounds)) {
                    item.hovered = true;

                    // check if the button is being clicked
                    if (mouseIsPressed) {
                        // reset the mouse state
                        mouseIsPressed = false;

                        // execute button function
                        item.on_click();
                        return;
                    }
                } else {
                    item.hovered = false;
                }
            }
        }
    }

    draw() {
        textAlign(CENTER);
        rectMode(CORNER);

        let opacity = this.opacity == null ? 255 : this.opacity;

        // draw the background
        fill(15, opacity);
        stroke(150, opacity);
        let bounds = this.background;
        rect(bounds.position.x, 
            bounds.position.y, 
            bounds.width, 
            bounds.height);

        // draw the title
        fill(255, opacity);
        textSize(30);
        let y = bounds.position.y + 40;
        text(this.title, 
            bounds.position.x + round(bounds.width / 2), 
            y);
        line(bounds.position.x + 10,
            y + 10, 
            bounds.position.x + bounds.width - 10, 
            y + 10);

        textSize(12);
        // draw the items
        for (let item of this.items) {
            bounds = item.bounds;

            if (item.type == "button") {
                // draw the button outline
                stroke(150, opacity);
                fill(item.hovered ? 30 : 10, opacity);
                rect(bounds.position.x,
                    bounds.position.y,
                    bounds.width,
                    bounds.height);
                
                // draw the text in the center of the button
                fill(255, opacity);
                noStroke();
                textSize(12);
                text(item.text, 
                    bounds.position.x + round(bounds.width / 2), 
                    bounds.position.y + round(bounds.height / 2) + 4);
            } else if (item.type == "text") {
                noStroke();
                fill(255);
                text(item.text(), 
                    bounds.position.x + 30, 
                    bounds.position.y + round(bounds.height / 2));
            }
        }
    }

    static is_mouse_over(bounds) {
        return mouseX >= bounds.position.x
            && mouseX <= bounds.position.x + bounds.width
            && mouseY >= bounds.position.y
            && mouseY <= bounds.position.y + bounds.height;
    }
}