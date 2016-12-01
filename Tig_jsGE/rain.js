class Raindrop {
    constructor(x,y,velx,vely) {
        this.x = this.originalx = x;
        this.y = this.originaly = y;
        this.velx = velx;
        this.vely = vely;

        this.color = "#444";
        this.segment = new Segment(x, y, velx*5, vely*5);
        this.length = 5;//segment.length();
        console.log("Raindrop created.");
    }
}

class RainManager {
    constructor(x,y,width,height,rain_volume)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.volume = rain_volume;
        this.raindrop = new Array();

        for (var i = 0; i < this.volume; i++) {

            this.raindrop[i] = new Raindrop(this.x + Math.random() * this.width,
                                            this.y - this.height/2 + Math.random() * this.height,
                                            -0.23,
                                            4 + Math.random() * 1.700);
        }

        this.process = () => {
            for (var i = 0; i < this.volume; i++) {

                //this.x = -grid.x;
                //this.y = -grid.y;
                //var x = this.x + this.raindrop[i].segment.x;
                //var y = this.y + this.raindrop[i].segment.y;
                //this.raindrop[i].segment.x = x;
                //this.raindrop[i].segment.y = y;
                this.raindrop[i].segment.x += this.raindrop[i].velx;
                this.raindrop[i].segment.y += this.raindrop[i].vely;
                if (this.raindrop[i].segment.y > this.height ||
                    this.raindrop[i].segment.x < 0 || this.raindrop[i].segment.x > this.width) {
                    this.raindrop[i].segment.x = this.raindrop[i].originalx;
                    this.raindrop[i].segment.y = this.raindrop[i].originaly;
                }
            }
        }

        this.draw = () => {
            for (var i = 0; i < this.volume; i++) {



                this.raindrop[i].segment.draw(1,  this.raindrop[i].color);
            }
        }
    }
}

var RainArea = new Array();

RainArea.add = function(x,y,width,height,vol) {
    RainArea[RainArea.length] = new RainManager(x,y,width,height,vol);
}