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
        this.apsis = opts.apsis;

        this.orbit_props = this.get_orbit();
        console.log(this.apsis)

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
            if(this.apsis != false){
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.moveTo(this.apsis[1].x, this.apsis[1].y);
                this.ctx.lineTo(this.orbit_props.x, this.orbit_props.y);
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = this.color;
                this.ctx.stroke();
                this.ctx.closePath();
                this.ctx.restore();

                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(this.apsis[0].x, this.apsis[0].y, this.rad+2, 0, 2*Math.PI, true);
                    this.ctx.fillStyle = this.color;
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeStyle = this.color;
                    // this.ctx.fill();
                    this.ctx.stroke();
                    this.ctx.closePath();
                    this.ctx.restore();

                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(this.apsis[1].x, this.apsis[1].y, this.rad+2, 0, 2*Math.PI, true);
                    this.ctx.fillStyle = this.color;
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeStyle = this.color;
                    // this.ctx.fill();
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
        // this.ctx.arc(SUN_OPTS.x, SUN_OPTS.y, this.orbit, 0, 2*Math.PI, false);
        // this.ctx.arc(this.orbit_props.x, this.orbit_props.y, this.orbit_props.rad, 0, 2*Math.PI, false);
        if(this.name == 'Mercury' || this.name == 'Venus' || this.name == 'Earth' 
        || this.name == 'Mars' || this.name == 'Jupiter' || this.name == 'Saturn'
        || this.name == 'Uranus' || this.name == 'Neptune' 
        ){
        this.ctx.arc(this.orbit_props.x, this.orbit_props.y, this.orbit_props.rad, 0, 2*Math.PI, false);
        // this.ctx.ellipse(
        //     this.orbit_props.x, 
        //     this.orbit_props.y, 
        //     this.apsis[1].dist_au, 
        //     this.apsis[0].dist_au, 
        //     this.orbit_props.angle,
        //     0, 2*Math.PI, false
        //     );
        }else{
            this.ctx.arc(SUN_OPTS.x, SUN_OPTS.y, this.orbit, 0, 2*Math.PI, false);
        }

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

    get_orbit(){
        if(this.apsis != false){
        let cat_a = this.apsis[1].x - this.apsis[0].x,
            cat_b = this.apsis[1].y - this.apsis[0].y,
            hypot_c = Math.hypot(cat_a, cat_b);
        
        let rad = hypot_c / 2,
            angle = Math.atan2(cat_b, cat_a),
            center_x = this.apsis[0].x + rad * Math.cos(angle),
            center_Y = this.apsis[0].y + rad * Math.sin(angle);



        return {
            x: center_x, 
            y: center_Y,
            rad,
            // angle: Math.acos(angle) * (180 / Math.PI),
            angle: angle,
        }
        };
    }

}