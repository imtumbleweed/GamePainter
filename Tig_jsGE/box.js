const MAX_BOX_NUMBER = 256000;
var GlobalObjectIdentifier = 0;
class Box {
    constructor(x,y,w,h) {
        this.identifier = GlobalObjectIdentifier++;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.bg = new Rectangle(x,y,w,h);
        this.line = new Segment(0,0,10,10);
        this.otherline = new Segment(0,0,10,10);
        this.materialColor = "#222";
        this.color = this.materialColor;
        this.selected = false;
        this.draw = function() {

            this.line.x             = grid.x + this.x;
            this.line.y             = grid.y + this.y;
            this.line.vecx          = this.width;
            this.line.vecy          = this.height;
            this.otherline.x        = grid.x + this.x + this.width;
            this.otherline.y        = grid.y + this.y;
            this.otherline.vecx     = -this.width;
            this.otherline.vecy     = this.height;
            this.bg.x               = grid.x + this.x;
            this.bg.y               = grid.y + this.y;
            this.bg.width           = this.width;
            this.bg.height          = this.height;

            this.bg.draw(this.color, true, false);
            this.line.draw(1, "#333");
            this.otherline.draw(1, "#333");
        };
    }
}

class BoxManagerClass {
    constructor() {
        this.objects = new Array();
        //this.lastObjectID = 0;
        this.objectsLoaded = false;
        //var objects = new Array(MAX_BOX_NUMBER);
        //for (var i = 0; i < MAX_BOX_NUMBER; i++) objects[i] = new Box(0,0,0,0);
        this.load = () => { // Load boxes
            //console.log("BoxManager.load();");
            $.ajax({url:"objects.txt", type:"post", success: function(msg) {
                //console.log("objects.txt = " + msg);
                var objs = JSON.parse(msg);
                for (var i=0;i<objs.length;i++) {
                    BoxManager.objects[i] = new Box(objs[i].x,objs[i].y,objs[i].width,objs[i].height);
                }
                console.log(BoxManager.objects.length + "object(s) loaded.");
                //console.log(this.objects);
                //console.log(this.objects.length);
                BoxManager.objectsLoaded = true;
            }});
        };
        this.save = () => {// Save boxes
            console.log("BoxManager.save();");
            //console.log("saving...");
            //console.log(JSON.stringify());
            //console.log(this.objects);
            $.ajax({url:"saveboxes.php", type : "post", data:{"payload":JSON.stringify(this.objects)}, success: function(msg) {
                console.log("saveboxes.php = " + msg);
            }});
        };
        // Add new box
        this.add = (x,y,w,h) => {
            this.objects[this.objects.length] = new Box(-grid.x+x,-grid.y+y,w,h);
            this.save(); // Save all boxes
        };

        // Delete (remove) this box
        this.remove = (id) => {
            if (id > -1)
                this.objects.splice(id,1);
        };

        // Draw the box
        this.draw = () => {
            //console.log(this.objects.length);
            for (var i=0;i<this.objects.length;i++)
                this.objects[i].draw();
        };
    }
}

var BoxManager = new BoxManagerClass();