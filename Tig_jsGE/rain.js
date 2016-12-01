class Raindrop {
    constructor(x,y,velx,vely) {
        this.x = this.originalx = x;
        this.y = this.originaly = y;
        this.velx = velx;
        this.vely = vely;
        this.segment = new Segment(x, y, velx, vely);
        this.length = raindrop.length();
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
            this.raindrop = new Raindrop(this.x + Math.random() * this.width,
                                         this.y + 1,
                                         -Math.random()*5,
                                         1);
        }

        this.process = () => {
            for (var i = 0; i < this.volume; i++) {
                this.raindrop[i].x += this.raindrop[i].velx;
                this.raindrop[i].y += this.raindrop[i].vely;
                if (this.raindrop[i].y > this.height ||
                    this.raindrop[i].x < 0 || this.raindrop[i].x > this.width) {
                    this.raindrop[i].x = this.raindrop[i].originalx;
                    this.raindrop[i].y = this.raindrop[i].originaly;
                }
            }
        }

        this.draw = () => {
            for (var i = 0; i < this.volume; i++) {
                this.raindrop[i].segment.draw(1, "white");
            }
        }
    }
}

var RainArea = new Array();