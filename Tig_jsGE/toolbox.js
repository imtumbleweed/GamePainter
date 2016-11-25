class Toolbox {
    constructor() {
        const HAND_GRAB = 0;
        this.currentToolID = HAND_GRAB;
        this.gridFriction = 0.01;
        this.toolSpritesheet = new Spritesheet("tools.png");
        this.old_x = 0;
        this.old_y = 0;
        this.drag_x = 0;
        this.drag_y = 0;
        this.line = new Segment(0,0,0,0);
        this.pressed = false; // Mouse button is held down
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
            if (this.pressed) // Draw the line only if mouse is currently held down
                this.line.draw(1, "#0080e2");
        }
        this.process = function() {
           if (this.currentToolID == HAND_GRAB) { // If hand-grab tool is chosen
               if (Mouse.down) { // Mouse-down -  Track single-frame "down" click - Remember x & y of click, but only once
                   this.old_x = Mouse.x;
                   this.old_y = Mouse.y;
                   //grid.x += Mouse.velocityx;
                   //grid.y += Mouse.velocityy;

                   this.pressed = true; // Set "mouse is down" state
               }
               if (window.clicked) { // Mouse up - This happens when mouse button is released
                   this.pressed = false; // Reset tool "mouse is down" state
                   // Memorize grid at its new location
                   grid.x = this.line.vecx;
                   grid.y = this.line.vecy;
                   // Reset line coordinates
                   this.line.vecx = 0;
                   this.line.vecy = 0;

               }
            }
            //grid.x -= grid.x * this.gridFriction;
            //grid.y -= grid.y * this.gridFriction;
        }
    }
}