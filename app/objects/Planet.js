import { SUN_OPTS } from "../../opts";

export default class Planet {
    constructor(opts){
        this.ctx = opts.ctx;
        this.x = opts.x;
        this.y = opts.y;
        this.rad = opts.rad;
        this.color = opts.color;
        this.orbit = opts.orbit;
        this.name = opts.name;

        this.BIG_ORBIT_FLAG = opts.BIG_ORBIT_FLAG;

        this.apsis_x = opts.apsis_x || false;
        this.apsis_y = opts.apsis_y || false;

        this.next_apsis_x = opts.next_apsis_x || false;
        this.next_apsis_y = opts.next_apsis_y || false;
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

    }
    render_apsis(){
        if(this.apsis_x != false){
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(this.apsis_x, this.apsis_y, this.rad, 0, 2*Math.PI, true);
                this.ctx.fillStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = this.color;
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.restore();

                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(this.next_apsis_x, this.next_apsis_y, this.rad, 0, 2*Math.PI, true);
                this.ctx.fillStyle = this.color;
                this.ctx.lineWidth = 5;
                this.ctx.strokeStyle = this.color;
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.restore();
        }
        
    }

    render_orbit(){
        if(this.orbit == false) return this;
        
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