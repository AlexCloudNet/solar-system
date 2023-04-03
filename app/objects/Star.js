export default class Star{
    constructor(opts){
        this.x = opts.x;
        this.y = opts.y;
        this.rad = opts.rad;
        this.opacity = opts.opacity;
        this.ctx = opts.ctx;
    }

    render(){
        this.ctx.beginPath();
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = `rgb(255, 255, 255, ${this.opacity})`;
        this.ctx.fillStyle = `rgb(255, 255, 255, ${this.opacity})`;
        this.ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }

}