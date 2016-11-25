class Toolbox {
    constructor() {
        const HAND_GRAB = 0;
        this.currentToolID = HAND_GRAB;
        this.gridFriction = 0.01;
        this.toolSpritesheet = new Spritesheet("tools.png");
        this.old_x = 0;
        this.old_y = 0;
        this.line = new Segment(0,0,0,0);
        this.pressed = false;
        //this.leftMouseButtonDown = false;
        this.select = (tool_id) => {
            this.currentToolID = tool_id;
        }
        this.draw = () => { // Draw current tool icon at mouse position
            //this.toolSpritesheet.draw();
            this.line.x = this.old_x;
            this.line.y = this.old_y;
            this.line.vecx = Mouse.x-this.old_x;
            this.line.vecy = Mouse.y-this.old_y;
            this.line.draw(1, "red");
        }
        this.process = () => {
            // Remember x&y of click, but only once
            if (window.clicked) {
                if (this.pressed == false) {
                    console.log(Mouse);
                    this.old_x = Mouse.x;
                    this.old_y = Mouse.y;
                    this.pressed = true;
                }
            } else { this.pressed = false; }

           if (this.currentToolID == HAND_GRAB) {
                if (Press.ed) {
                    grid.x += Mouse.velocityx;
                    grid.y += Mouse.velocityx;
                }
            }
            grid.x -= grid.x * this.gridFriction;
            grid.y -= grid.y * this.gridFriction;
        }
    }
}