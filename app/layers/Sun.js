import {SUN_OPTS} from "../../opts";

export default class Sun{
    constructor(ctx){
        
        this.ctx = ctx
        this.linearGradient = this.ctx.createLinearGradient(287.5, 287.5, 312.5, 312.5);
        this.linearGradient.addColorStop(0, '#f12711');
        this.linearGradient.addColorStop(1, '#f5af19');
    }

    render(){

        this.ctx.save();
        this.ctx.beginPath();
        
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#f5af19";
        this.ctx.fillStyle = this.linearGradient;
        this.ctx.arc(SUN_OPTS.x, SUN_OPTS.y, SUN_OPTS.rad, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    
    }
}