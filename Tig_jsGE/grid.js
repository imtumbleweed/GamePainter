class Grid {
    constructor(width, height) {
        const GlobalSize = 50;
        const LineLenght = 2000;
        const LineColor = "#191919";
        const LineSubColor = "#0a0a0a";
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.verticalSegments = new Array();
        this.horizontalSegments = new Array();
        this.verticalSubSegments = new Array();
        this.horizontalSubSegments = new Array();

        var orig_x = 0; // Mouse.velocityx; // this.x + i * this.width;
        var orig_y = 0;   // this.y + i * this.width;

        for (var i = 0; i < GlobalSize; i++) this.verticalSegments[i] = new Segment(orig_x + i * this.width, 0,     0, LineLenght);
        for (var i = 0; i < GlobalSize; i++) this.horizontalSegments[i] = new Segment(0, orig_y + i * this.width,     LineLenght, 0);
        for (var i = 0; i < GlobalSize; i++) this.verticalSubSegments[i] = new Segment(orig_x + i * this.width/2, 0,     0, LineLenght);
        for (var i = 0; i < GlobalSize; i++) this.horizontalSubSegments[i] = new Segment(0, orig_y + i * this.width/2,     LineLenght, 0);

        this.process = () => { // Move grid by the amount
            if (toolbox.pressed) { // If mouse button is pressed down
                this.x += toolbox.line.vecx;
                this.y += toolbox.line.vecy;
            }
        }

        this.drawSubgrid = () => {
            for (var i = 0; i < GlobalSize; i++) {
                this.verticalSubSegments[i].draw(1, LineColor);
                this.horizontalSubSegments[i].draw(1, LineColor);
            }
        }

        this.draw = () => {

            this.drawSubgrid();
            for (var i = 0; i < GlobalSize; i++) {
                this.verticalSegments[i].x = i * this.width + this.x;
                this.verticalSegments[i].y = i * this.height + this.y;
                this.horizontalSegments[i].x = i * this.width + this.x;
                this.horizontalSegments[i].y = i * this.height + this.y;
                this.verticalSegments[i].draw(1, LineColor);
                this.horizontalSegments[i].draw(1, LineColor);
            }
        }
    }
}