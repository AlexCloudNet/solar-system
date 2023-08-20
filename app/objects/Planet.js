import { SUN_OPTS } from "../../opts";

export default class Planet {
    constructor(opts){
        this.ctx = opts.ctx;
        this.x = opts.x;
        this.y = opts.y;
        this.rad = opts.rad;
        this.dist = opts.dist;
        this.color = opts.color;
        this.orbit = opts.orbit;
        this.name = opts.name;

        this.ctx.font = "bold 24px sans-serif";
        this.name_width = this.ctx.measureText(this.name).width;
        this.select = false;
        this.BIG_ORBIT_FLAG = opts.BIG_ORBIT_FLAG;
    }

    render_planet(){
        if(this.name == 'Mercury' || this.name == 'Venus' || this.name == 'Earth' || this.name == 'Mars'){
            if(this.BIG_ORBIT_FLAG){
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, true);
                this.ctx.fillStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = this.color;
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.restore();
            }
        }else{
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, true);
                this.ctx.fillStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = this.color;
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.restore();
        }
        if(this.select){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.color;
            this.ctx.arc(this.x, this.y, this.rad+10, 0, 2*Math.PI, true);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(SUN_OPTS.x, SUN_OPTS.y);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.font = "12px sans-serif";
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.dist + ' AU', this.x+this.rad+20+this.name_width, this.y - this.rad-20);
            this.ctx.fillText(this.dist*150 + ' mil km', this.x+this.rad+20+this.name_width, this.y - this.rad-30);
            this.ctx.restore();
        }
    }

    render_orbit(){
        this.ctx.save();
        this.ctx.beginPath();
        // this.ctx.setLineDash([2, 2]);
        this.ctx.arc(SUN_OPTS.x, SUN_OPTS.y, this.orbit, 0, 2*Math.PI, false);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    static calcDegrees(y, x){
        return Math.atan2(y, x) * 180/Math.PI;
    }

    render_name(){
        if(this.name == 'Mercury' || this.name == 'Venus' || this.name == 'Earth' || this.name == 'Mars'){
            if(this.BIG_ORBIT_FLAG){
                this.ctx.font = "bold 24px sans-serif";
                this.ctx.fillStyle = this.color;
                this.ctx.fillText(this.name, this.x + this.rad + 10, this.y - this.rad - 10);
            }
        }else{
            this.ctx.font = "bold 24px sans-serif";
                this.ctx.fillStyle = this.color;
                this.ctx.fillText(this.name, this.x + this.rad + 10, this.y - this.rad - 10);
        }
    }


}