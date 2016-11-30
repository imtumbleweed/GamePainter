class Toolbox {

    constructor() {
        this.SELECTION_TOOL = 0;
        this.MOVE_WORLD = 1;
        this.BOX_TOOL = 2;
        this.CIRCLE_TOOL = 3;
        this.WHOKNOWS_TOOL = 4;
        this.PLAYER_TOOL = 5;
        this.currentToolID = this.BOX_TOOL;
        this.gridFriction = 0.01;
        this.toolSpritesheet = new Spritesheet("tools.png");
        this.old_x = 0;
        this.old_y = 0;
        this.drag_x = 0; // current position of the grid in the world (todo: move to grid.js)
        this.drag_y = 0;
        this.line = new Segment(0, 0, 0, 0);
        this.otherline = new Segment(0, 0, 0, 0);
        this.pressed = false; // Mouse button is held down
        this.selectionBox = new Rectangle(0, 0, 0, 0);
        this.infoBox = new Rectangle(0, 0, 0, 0);

        // Keyboard shortcuts
        $(document).on('keydown', function(e) {
            if (e.which == 46) {
                var index = 0;
                var s = "s";
                for (var i = 0; i < MAX_BOX_NUMBER; i++)
                    if (BoxManager.objects[i] != undefined)
                        if (BoxManager.objects[i].selected)
                            index++;
                if (index == 1) s = "";
                console.log("Deleting " + index + " object" + s + ".");
                for (var i = 0; i < MAX_BOX_NUMBER; i++) {
                    if (BoxManager.objects[i] != undefined) {
                        if (BoxManager.objects[i].selected) {
                            BoxManager.remove(i);
                            i--; // prevent splicer re-indexing
                        } else index++;
                    }
                }
            BoxManager.save();
            return false;
        }});

        this.select = (tool_id) => {
            this.currentToolID = tool_id;
        }
        this.draw = () => { // Draw current tool icon at mouse position
            //this.toolSpritesheet.draw();
            //if (this.pressed) // Draw the line only if mouse is currently held down
               //this.line.draw(1, "#0080e2");
        }
        this.process = function () {

            // Universal diagonal line!
            this.line.x = this.old_x;
            this.line.y = this.old_y;
            this.line.vecx = Mouse.x - this.old_x;
            this.line.vecy = Mouse.y - this.old_y;
            this.otherline.x = this.old_x + this.line.vecx;
            this.otherline.y = this.old_y;
            this.otherline.vecx = -this.line.vecx;
            this.otherline.vecy = this.line.vecy;

            /* --- Standard tool events ---
            if (this.currentToolID == this.SELECTION_TOOL) { // Select objects in the world
                // Mouse is being currently pressed down
                 if (this.pressed) { }
                 // Mouse was clicked down
                 if (Mouse.down) { this.pressed = true; this.old_x = Mouse.x; this.old_y = Mouse.y; }
                 // Mouse was clicked up
                 if (window.clicked) { this.pressed = false; }
             } */

            if (this.currentToolID == this.ERASER_TOOL) { // Select objects in the world
                // Mouse is being currently pressed down
                if (this.pressed) {

                    // Browse through all objects and see if we're hovering over any of them, if so, delete object...
                    for (var i=0;i<BoxManager.objects.length;i++) {
                        if (BoxManager.objects[i] != undefined)
                            if (BoxManager.objects[i].bg.pointInside(Mouse.x, Mouse.y)) {
                                BoxManager.objects[i].color = "red";
                                // remove this object
                                //BoxManager.remove(i);
                            }
                    }

                }
                // Mouse was clicked down
                if (Mouse.down) {



                    this.pressed = true;
                }
                // Mouse was clicked up
                if (window.clicked) { this.pressed = false; }
            }

            // Make a box
            if (this.currentToolID == this.BOX_TOOL) {
                window.gfx.setLineDash([]);
                // Mouse is being currently pressed down
                if (this.pressed) {
                    this.selectionBox.x = this.old_x;
                    this.selectionBox.y = this.old_y;
                    this.selectionBox.width = Mouse.x-this.old_x;
                    this.selectionBox.height = Mouse.y-this.old_y;

                    this.selectionBox.draw("#555", true, false);

                    this.line.draw(1, "#333");
                    this.otherline.draw(1, "#333");
                    // Draw box size inside info box
                    this.infoBox.x = Mouse.x + 48;
                    this.infoBox.y = Mouse.y + 16;
                    this.infoBox.width = 80;
                    this.infoBox.height = 64;
                    window.gfx.globalAlpha = 0.75;
                    this.infoBox.draw("#000", true, false);
                    window.gfx.globalAlpha = 1;
                    // Print box size
                    text( "World = " + (-window.grid.x+this.selectionBox.x) + ", " + (this.selectionBox.y - window.grid.y),  this.selectionBox.x - 8,  this.selectionBox.y - 8, "white", "left", 11, "verdana");
                    // Print box dimensions
                    text("W: " + this.selectionBox.width,  Mouse.x + 54, Mouse.y + 32,  "white", "left", 11, "verdana");
                    text("H: " + this.selectionBox.height,  Mouse.x + 54, Mouse.y + 48,  "white", "left", 11, "verdana");
                }
                // Draw box

                //window.gfx.setLineDash([]);
                // Mouse was clicked down
                if (Mouse.down) { this.pressed = true; this.old_x = Mouse.x; this.old_y = Mouse.y; }
                // Mouse was clicked up
                if (window.clicked) {
                    // Add this box to box manager
                    this.pressed = false;
                    // Ignore objects with 0 width or height
                    if (this.selectionBox.width != 0 || this.selectionBox.height != 0)
                        BoxManager.add(this.old_x, this.old_y, this.selectionBox.width, this.selectionBox.height);
                }
            }

            // Select objects in the world
            if (this.currentToolID == this.SELECTION_TOOL) {
                // Mouse is being currently pressed down
                if (this.pressed) {
                    this.selectionBox.x = this.old_x;
                    this.selectionBox.y = this.old_y;
                    this.selectionBox.width = Mouse.x-this.old_x;
                    this.selectionBox.height = Mouse.y-this.old_y;

                    // Draw selection box
                    window.gfx.setLineDash([4]);
                    window.gfx.lineWidth = 1;
                    //window.gfx.globalCompositeOperation="destination-out";
                    this.selectionBox.draw("#777", false, true);
                    //window.gfx.globalCompositeOperation="normal";
                    window.gfx.setLineDash([]);

                    // Browse through all objects and see if we're hovering over any of them, if so, delete object...
                    for (var i=0;i<BoxManager.objects.length;i++) {
                        if (BoxManager.objects[i] != undefined)
                            if (BoxManager.objects[i].bg.rectInside(this.selectionBox)) {
                                BoxManager.objects[i].color = "#22a28e";
                                BoxManager.objects[i].selected = true;
                            } else {
                                BoxManager.objects[i].color = BoxManager.objects[i].materialColor;
                                BoxManager.objects[i].selected = false;
                            }
                    }
                }

                // Mouse was clicked down
                if (Mouse.down) { this.pressed = true; this.old_x = Mouse.x; this.old_y = Mouse.y; }
                // Mouse was clicked up
                if (window.clicked) {this.pressed = false; }
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
                    this.drag_x = window.grid.x; // memorize current grid position in the world
                    this.drag_y = window.grid.y;
                    this.pressed = true; // Set "mouse is down" state
                }
                if (window.clicked) { // Mouse up - This happens when mouse button is released
                    // Only now reset line coordinates
                    this.line.vecx = 0;
                    this.line.vecy = 0;
                    this.pressed = false; // Reset tool "mouse is down" state
                    if(localStorage) {
                        localStorage.worldx = window.grid.x;
                        localStorage.worldy = window.grid.y;
                    }
                }
            }

            // Draw dashboard info
            text("Game World at x=" + window.grid.x + "px, y=" + window.grid.y + "px", 16, 16, "yellow", "left", 11, "verdana");

            // Draw Game Painter version
            text("Game Painter v0.002", game.width/2, 48, "yellow", "center", 14, "arial");

            // Copyright
            text("Game making tool created by Tigris Games", game.width/2, 64, "#777", "center", 14, "arial");
        }
    }
}