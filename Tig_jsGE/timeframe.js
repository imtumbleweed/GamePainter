class TimeframePanel {
    constructor(x, y, width, height) {
        this.area = Rectangle(x,y,width,height);
        this.active = false;
        this.length = 0;                // Length of active animation
        this.process = () => {
            if (this.area.pointInside(Mouse.x, Mouse.y))
                this.active = true;
        }
        this.draw = () => {
            area.draw("#262626", true, false);
            if (this.active) {
                area.draw("#3399cc", false, true);
            }

        }
    }
};

var Timeframe = new TimeframePanel();