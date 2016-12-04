class Triangle {
    constructor(ax0,ay0,avecx,avecy,
                bx0,by0,bvecx,bvecy,
                cx0,cy0,cvecx,cvecy) {
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