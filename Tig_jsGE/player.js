class PlayerClass {
    constructor() {
        this.x = 0; // World coordinates
        this.y = 0;
        this.velx = 0;  // velocity
        this.vely = 0;
        this.momx = 0;  // momentum
        this.momy = 0;
        this.materialColor = "#9cff00";
        this.color = this.materialColor;
        this.body = new Rectangle(this.x,this.y,32,64);
        this.active = false;
        this.pressed = false;
        this.attachedToMouse = false;
        this.gravityType = 0; // 0 = hovering (0-gravity)
                              // 1 = normal gravity
                              // 2 = top down view (Z-axis gravity)

        this.spawn = (px, py) => {
            console.log("Spawning player at " + px + ", " + py);
            this.body.x = px-this.width/2;
            this.body.y = py-this.width/2;
            this.active = true;
            this.attachedToMouse = true;
            this.pressed = true;
        }

        this.process = () => {
            if (this.active) {

                // Drag player around if attached to mouse
                if (this.attachedToMouse) {
                    this.x = -grid.x+Mouse.x-this.body.width/2;
                    this.y = -grid.y+Mouse.y-this.body.height/2;
                }
                if (this.pressed) {

                }
                // Mouse was clicked down once
                if (Mouse.down) {
                    if (this.body.pointInside(Mouse.x, Mouse.y)) {
                        this.attachedToMouse = true;
                        this.pressed = true;
                        this.color = "#c6f000";
                        // Reset toolbox
                        toolbox.currentToolID = -1;
                        toolbox.line.vecx = 0;
                        toolbox.line.vecy = 0;
                        toolbox.pressed = false;
                        $(".ToolIcon").removeClass("Selected");
                    }
                }
                // Mouse was clicked up once
                if (window.clicked) {
                    if (this.attachedToMouse) { // release from the mouse into the world
                        this.attachedToMouse = false;
                        this.color = this.materialColor;
                    }
                    this.pressed = false;
                }
            }
        };

        this.draw = () => {
            if (this.active) {
                this.body.x = grid.x + this.x;
                this.body.y = grid.y + this.y;
                this.body.draw(this.color, true, true);
            }
        }
    }
}