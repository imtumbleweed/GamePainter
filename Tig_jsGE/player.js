const LEFT = 0;
const RIGHT = 2;
const UP = 4;
const DOWN = 8;
var temp = new Segment(0,0,0,0);
var poi = new Point(0,0);
class PlayerClass {
    constructor() {
        this.x = 0; // World coordinates
        this.y = 0;
        this.velx = 0;  // velocity
        this.vely = 0;
        this.momx = 0;  // momentum
        this.momy = 0;
        this.materialColor = "#19a6ff";
        this.color = this.materialColor;
        this.body = new Rectangle(this.x,this.y,64,64);
        this.active = false;
        this.pressed = false;
        this.attachedToMouse = false;
        this.controlKeysPressed = false;
        this.dirx = RIGHT; // defaults
        this.diry = DOWN;
        this.gravityType = 1; // 0 = hovering (0-gravity)
                              // 1 = normal gravity
                              // 2 = top down view (Z-axis gravity)

        this.colray = new Segment(32, 8, 0, 80); // collision ray (down)

        this.playerHeight = 32; // height of the player counting from top of the collision ray

        this.falling = true;

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

                // Process player movement
                if (this.gravityType == 1) {
                    if (Player.controlKeysPressed == false) {
                        this.momx -= this.momx * 0.05;
                        this.x += this.momx;
                    }
                }

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

                if (this.falling) {
                    this.y += 2.8;
                }
            }
        };

        this.collide = () => {
            if (this.active) {
                var collision = false;
                for (var i = 0; i < BoxManager.objects.length; i++) {

                    if (BoxManager.objects[i].type == BOX_TYPE_RECT) {
                        temp.x = grid.x + BoxManager.objects[i].bg.x;
                        temp.y = grid.y + BoxManager.objects[i].bg.y;
                        temp.vecx = BoxManager.objects[i].bg.width;
                        temp.vecy = 0;
                    }

                    if (BoxManager.objects[i].type == BOX_TYPE_LEFTSLOPE) {
                        temp.x = grid.x + BoxManager.objects[i].triangle.A.x;
                        temp.y = grid.y + BoxManager.objects[i].triangle.A.y;
                        temp.vecx = -BoxManager.objects[i].width;
                        temp.vecy = BoxManager.objects[i].triangle.A.vecy - BoxManager.objects[i].triangle.B.vecy;
                    }

                    temp.draw(1,"red");

                    if (temp.intersect(this.colray) == DO_INTERSECT) {
                        poi.x = window.int_x;
                        poi.y = window.int_y;
                        poi.draw(3, "red");
                        temp.x = this.colray.x;
                        temp.y = this.colray.y;
                        temp.width = 1;
                        temp.height = poi.y - this.colray.y;
                        if (temp.height > 0) {
                            if (temp.height <= this.playerHeight) {
                                this.falling = false;
                                collision = true;
                            }
                        }
                    }

                }
                if (collision == false) {
                    this.falling = true;
                }
            }
        }

        this.draw = () => {
            if (this.active) {
                this.body.x = grid.x + this.x;
                this.body.y = grid.y + this.y;
                this.body.draw(this.color, false, true);
                this.colray.x = this.body.x + 32;
                this.colray.y = this.body.y + 8;
                // this.colray.draw(2, "white");
            }
        }

        // Load player's previous position if available
        this.load = () => {
            console.log("Loading Player data.");
            $.ajax( { url : "player.txt", type: "POST", success: function(msg) {
                //if (Player instanceof PlayerClass) {
                    var object = JSON.parse(msg);
                    for (var property in object) {
                        if (object.hasOwnProperty(property)) {
                            //console.log(typeof(property));
                            if (object[property] != "[object Object]") {
                                Player[property] = object[property];
                                //console.log(property + "=" + object[property]);
                            }
                        }
                    }

                    //console.log(msg);
                    //Player = JSON.parse(msg);
                //}
            }});
        }

        // Save player position in file
        this.save = () => {
            $.ajax( {   url : "saveplayer.php",  type : "POST",
                        data : { "payload" : JSON.stringify(Player)},
                success: function(msg) {
                    console.log(msg);
                }
            });
        }
    }
}