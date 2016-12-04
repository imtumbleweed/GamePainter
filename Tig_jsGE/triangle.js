class Triangle {
    constructor(ax0,ay0,avecx,avecy,
                bx0,by0,bvecx,bvecy,
                cx0,cy0,cvecx,cvecy) {

        if (arguments.length == 0) {
            this.ax0 = 0;
            this.ay0 = 0;
            this.avecx0 = 0;
            this.avecy0 = 0;
            this.bx0 = 0;
            this.by0 = 0;
            this.bvecx0 = 0;
            this.bvecy0 = 0;
            this.cx0 = 0;
            this.cy0 = 0;
            this.cvecx0 = 0;
            this.cvecy0 = 0;
        }

        this.A = new Segment(ax0,ay0,avecx,avecy);
        this.B = new Segment(bx0,by0,bvecx,bvecy);
        this.C = new Segment(cx0,cy0,cvecx,cvecy);

        this.color = "#fff";
        this.draw = () => {
            this.A.draw(1, this.color);
            this.B.draw(1, this.color);
            this.C.draw(1, this.color);
        }
    }
};