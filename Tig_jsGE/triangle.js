class Triangle {
    constructor(ax,ay,avecx,avecy,
                bx,by,bvecx,bvecy,
                cx,cy,cvecx,cvecy) {

        if (arguments.length == 0) {
            this.ax = 0;
            this.ay = 0;
            this.avecx = 0;
            this.avecy = 0;
            this.bx = 0;
            this.by = 0;
            this.bvecx = 0;
            this.bvecy = 0;
            this.cx = 0;
            this.cy = 0;
            this.cvecx = 0;
            this.cvecy = 0;
        }

        this.A = new Segment(ax,ay,avecx,avecy);
        this.B = new Segment(bx,by,bvecx,bvecy);
        this.C = new Segment(cx,cy,cvecx,cvecy);

        this.set = (ax,ay,avec,avecy,
            bx,by,bvecx,bvecy,
            cx,cy,cvecx,cvecy) => {
            this.ax = ax;
            this.ay = ay;
            this.avecx = avecx;
            this.avecy = avecy;
            this.bx = bx;
            this.by = by;
            this.bvecx = bvecx;
            this.bvecy = bvecy;
            this.cx = cx;
            this.cy = cy;
            this.cvecx = cvecx;
            this.cvecy = cvecy;
        }

        this.color = "#fff";
        this.draw = () => {
            this.A.draw(1, this.color);
            this.B.draw(1, this.color);
            this.C.draw(1, this.color);
        }
    }
};