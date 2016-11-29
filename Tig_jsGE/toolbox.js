class Toolbox {

    constructor() {
        this.SELECTION_TOOL = 0;
        this.MOVE_WORLD = 1;
        this.currentToolID = this.MOVE_WORLD;
        this.gridFriction = 0.01;
        this.toolSpritesheet = new Spritesheet("tools.png");
        this.old_x = 0;
        this.old_y = 0;
        this.drag_x = 0; // current position of the grid in the world (todo: move to grid.js)
        this.drag_y = 0;
        this.line = new Segment(0, 0, 0, 0);
        this.pressed = false; // Mouse button is held down
        this.selectionBox = new Rectangle(0, 0, 100, 100);
        //this.leftMouseButtonDown = false;
        this.select = (tool_id) => {
            this.currentToolID = tool_id;
        }
        this.draw = () => { // Draw current tool icon at mouse position
            //this.toolSpritesheet.draw();
            //if (this.pressed) // Draw the line only if mouse is currently held down
               //this.line.draw(1, "#0080e2");
        }
        this.process = function () {

            this.line.x = this.old_x;
            this.line.y = this.old_y;
            this.line.vecx = Mouse.x - this.old_x;
            this.line.vecy = Mouse.y - this.old_y;

            /* --- Standard tool events ---
            if (this.currentToolID == this.SELECTION_TOOL) { // Select objects in the world
                // Mouse is being currently pressed down
                 if (this.pressed) { }
                 // Mouse was clicked down
                 if (Mouse.down) { this.pressed = true; this.old_x = Mouse.x; this.old_y = Mouse.y; }
                 // Mouse was clicked up
                 if (window.clicked) { this.pressed = false; }
             }*/

            if (this.currentToolID == this.SELECTION_TOOL) { // Select objects in the world
                // Mouse is being currently pressed down
                if (this.pressed) {
                    this.selectionBox.x = this.old_x;
                    this.selectionBox.y = this.old_y;
                    this.selectionBox.width = Mouse.x-this.old_x;
                    this.selectionBox.height = Mouse.y-this.old_y;
                }
                window.gfx.setLineDash([2]);
                window.gfx.lineWidth = 1;
                this.selectionBox.draw("#777");
                window.gfx.setLineDash([]);
                // Mouse was clicked down
                if (Mouse.down) { this.pressed = true; this.old_x = Mouse.x; this.old_y = Mouse.y; }
                // Mouse was clicked up
                if (window.clicked) { this.pressed = false; }
            }

            if (this.currentToolID == this.MOVE_WORLD) { // If hand-grab tool is chosen
                // Update the main grid position
                if (this.pressed) {
                    window.grid.x = this.drag_x + this.line.vecx;
                    window.grid.y = this.drag_y + this.line.vecy;
                }
                if (Mouse.down) { // Mouse-down -  Track single-frame "down" click - Remember x & y of click, but only once
                    this.old_x = Mouse.x;
                    this.old_y = Mouse.y;
                    this.drag_x = grid.x; // memorize current grid position in the world
                    this.drag_y = grid.y;
                    this.pressed = true; // Set "mouse is down" state
                }
                if (window.clicked) { // Mouse up - This happens when mouse button is released
                    // Only now reset line coordinates
                    this.line.vecx = 0;
                    this.line.vecy = 0;
                    this.pressed = false; // Reset tool "mouse is down" state
                }
            }

            // Draw dashboard info
            text("Game World at x=" + window.grid.x + "px, y=" + window.grid.y + "px", 16, 16, "yellow", "left", 11, "verdana");
        }
    }
}