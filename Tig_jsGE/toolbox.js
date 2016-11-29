class Toolbox {
    constructor() {
        const HAND_GRAB = 0;
        this.currentToolID = HAND_GRAB;
        this.gridFriction = 0.01;
        this.toolSpritesheet = new Spritesheet("tools.png");
        this.old_x = 0;
        this.old_y = 0;
        this.drag_x = 0; // current position of the grid in the world (todo: move to grid.js)
        this.drag_y = 0;
        this.line = new Segment(0,0,0,0);
        this.pressed = false; // Mouse button is held down
        //this.leftMouseButtonDown = false;
        this.select = (tool_id) => {
            this.currentToolID = tool_id;
        }
        this.draw = () => { // Draw current tool icon at mouse position
            //this.toolSpritesheet.draw();
            if (this.pressed) // Draw the line only if mouse is currently held down
                this.line.draw(1, "#0080e2");
        }
        this.process = function() {

            this.line.x = this.old_x;
            this.line.y = this.old_y;
            this.line.vecx = Mouse.x-this.old_x;
            this.line.vecy = Mouse.y-this.old_y;

           if (this.currentToolID == HAND_GRAB) { // If hand-grab tool is chosen

               // Update the main grid position
               if (this.pressed) {
                   window.grid.x = this.drag_x + this.line.vecx;
                   window.grid.y = this.drag_y + this.line.vecy;
                   // update position coordinates on the screen
               }

               //console.log(window.grid.x);

               if (Mouse.down) { // Mouse-down -  Track single-frame "down" click - Remember x & y of click, but only once
                   this.old_x = Mouse.x;
                   this.old_y = Mouse.y;
                   this.drag_x = grid.x; // memorize current grid position in the world
                   this.drag_y = grid.y;

                   this.pressed = true; // Set "mouse is down" state
               }
               if (window.clicked) { // Mouse up - This happens when mouse button is released

                   // Memorize grid at its new location
                   //window.grid.x = this.line.vecx;
                   //window.grid.y = this.line.vecy;

                   // Only now reset line coordinates
                   this.line.vecx = 0;
                   this.line.vecy = 0;

                   this.pressed = false; // Reset tool "mouse is down" state
               }
            }
            // Draw dashboard info
            text("Game World at x="+window.grid.x+"px, y=" + window.grid.y + "px", 16,16,"yellow","left",11,"verdana");
        }
    }
}