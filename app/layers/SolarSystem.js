// import {Astronomy} from "../libs/astronomy";
import * as Astronomy from "../../node_modules/astronomy-engine/esm/astronomy"


import {
    SUN_OPTS,
    DELTA_ORBIT_RAD
} from "../../opts";

import Planet from "../objects/Planet.js";

export default class SolarSystem{

    planetsOpts = [
        {
            name: 'Mercury',
            color: '#bdc3c7',
            size: 2,
            orbitalDistance: 36,
            x: Astronomy.HelioVector("Mercury", new Date, false).x,
            y: Astronomy.HelioVector("Mercury", new Date, false).y,
        },
        {
            name: 'Venus',
            color: '#BA8B02',
            size: 4.7,
            orbitalDistance: 50,
            x: Astronomy.HelioVector("Venus", new Date, false).x,
            y: Astronomy.HelioVector("Venus", new Date, false).y,
        },
        {
            name: 'Earth',
            color: '#43c6ac',
            size: 5,
            orbitalDistance: 70,
            x: Astronomy.HelioVector("Earth", new Date, false).x,
            y: Astronomy.HelioVector("Earth", new Date, false).y,
        },
        {
            name: 'Mars',
            color: '#EB5757',
            size: 2.6,
            orbitalDistance: 90,
            x: Astronomy.HelioVector("Mars", new Date, false).x,
            y: Astronomy.HelioVector("Mars", new Date, false).y,
        },
        {
            name: 'Jupiter',
            color: '#ffd89b',
            size: 15,
            orbitalDistance: 116,
            x: Astronomy.HelioVector("Jupiter", new Date, false).x,
            y: Astronomy.HelioVector("Jupiter", new Date, false).y,
        },
        {
            name: 'Saturn',
            color: '#BE985F',
            size: 12,
            orbitalDistance: 156,
            x: Astronomy.HelioVector("Saturn", new Date, false).x,
            y: Astronomy.HelioVector("Saturn", new Date, false).y,
        },
        {
            name: 'Uranus',
            color: '#D0F6F8',
            size: 10,
            orbitalDistance: 195,
            x: Astronomy.HelioVector("Uranus", new Date, false).x,
            y: Astronomy.HelioVector("Uranus", new Date, false).y,
        },
        {
            name: 'Neptune',
            color: '#344BB2',
            size: 9,
            orbitalDistance: 220,
            x: Astronomy.HelioVector("Neptune", new Date, false).x,
            y: Astronomy.HelioVector("Neptune", new Date, false).y,
        },
        {
            name: 'Pluto',
            color: '#41260F',
            size: 1,
            orbitalDistance: 240,
            x: Astronomy.HelioVector("Pluto", new Date, false).x,
            y: Astronomy.HelioVector("Pluto", new Date, false).y,
        },
        
        
    ];


    constructor(ctx){
        this.ctx = ctx;
        this.DELTA_ORBIT_RAD = DELTA_ORBIT_RAD;
        this.BIG_ORBIT_FLAG = 1;

        this.planetsArr = this.get_planets_opts();
        window.addEventListener('wheel', this.scrollResize.bind(this));

        console.log(Astronomy.HelioVector("Mars", new Date, false))

    }


    get_planets_opts(){
        let planetsArr = [];
    
        this.planetsOpts.forEach(elem => {
            let catX = Math.abs(SUN_OPTS.x - (elem.x*this.DELTA_ORBIT_RAD+SUN_OPTS.x));
            let catY = Math.abs(SUN_OPTS.y - (elem.y*this.DELTA_ORBIT_RAD+SUN_OPTS.y));
    
            planetsArr.push( new Planet(
                    {
                        x: elem.x * this.DELTA_ORBIT_RAD + SUN_OPTS.x,
                        y: elem.y * this.DELTA_ORBIT_RAD + SUN_OPTS.y,
                        name: elem.name,
                        color: elem.color,
                        rad: elem.size,
                        orbit: Math.hypot(catX, catY),
                        ctx: this.ctx,
                        BIG_ORBIT_FLAG: this.BIG_ORBIT_FLAG,
                    }
                )
            );
    
        })
    
        return planetsArr;
    }

    render(){
        this.planetsArr.forEach(planet => {
            planet.render_planet();
            planet.render_orbit();
            planet.render_name();
        })
    }

    scrollResize(event){
        if(event.deltaY < 0){
            if(this.DELTA_ORBIT_RAD >= 180){
                    this.DELTA_ORBIT_RAD+=20;
            }else{
                if(this.DELTA_ORBIT_RAD < 80){
                        this.DELTA_ORBIT_RAD+=2;
                }else{
                        this.DELTA_ORBIT_RAD+=10;
                }
            }

            if(this.DELTA_ORBIT_RAD >= 66) SUN_OPTS.rad+=1;

        }else{
            if(this.DELTA_ORBIT_RAD <= 10) return;
            if(this.DELTA_ORBIT_RAD > 180){
                    this.DELTA_ORBIT_RAD-=20;
            }else{
                if(this.DELTA_ORBIT_RAD <= 80){
                        this.DELTA_ORBIT_RAD-=2;
                }else{
                        this.DELTA_ORBIT_RAD-=10;
                }
            }
    
            if(SUN_OPTS.rad <=1) {
                SUN_OPTS.rad=1;
            }else{
                SUN_OPTS.rad-=1;
            }
        }
    
        this.DELTA_ORBIT_RAD <= 50? this.BIG_ORBIT_FLAG = 0: this.BIG_ORBIT_FLAG = 1;
        this.planetsArr = this.get_planets_opts();
    }


}