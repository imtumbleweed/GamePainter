class TimelinePanel {
    constructor(px, py, width, height) {
        this.x = 0;
        this.y = $(window).height() - height;
        this.width = width;
        this.height = height;
        this.area = Rectangle(this.x,this.y,this.width,this.height);
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

