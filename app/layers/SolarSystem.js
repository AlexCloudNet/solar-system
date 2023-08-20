// import {Astronomy} from "../libs/astronomy";
import * as Astronomy from "../../node_modules/astronomy-engine/esm/astronomy"
// import {HelioVector} from "../../node_modules/astronomy-engine/esm/astronomy";


import {
    SUN_OPTS,
    DELTA_ORBIT_RAD
} from "../../opts";

import Planet from "../objects/Planet.js";

export default class SolarSystem{
    date_now = new Date;
    planetsOpts = [
        {
            name: 'Mercury',
            color: '#bdc3c7',
            size: 2,
            orbitalDistance: 36,
            x: Astronomy.HelioVector("Mercury", new Date).x,
            y: Astronomy.HelioVector("Mercury", new Date).y,
            distance: Astronomy.HelioDistance('Mercury', new Date),
        },
        {
            name: 'Venus',
            color: '#BA8B02',
            size: 4.7,
            orbitalDistance: 50,
            x: Astronomy.HelioVector("Venus", new Date).x,
            y: Astronomy.HelioVector("Venus", new Date).y,
            distance: Astronomy.HelioDistance('Venus', new Date),
        },
        {
            name: 'Earth',
            color: '#43c6ac',
            size: 5,
            orbitalDistance: 70,
            x: Astronomy.HelioVector("Earth", new Date).x,
            y: Astronomy.HelioVector("Earth", new Date).y,
            distance: Astronomy.HelioDistance('Earth', new Date),
        },
        {
            name: 'Mars',
            color: '#EB5757',
            size: 2.6,
            orbitalDistance: 90,
            x: Astronomy.HelioVector("Mars", new Date).x,
            y: Astronomy.HelioVector("Mars", new Date).y,
            distance: Astronomy.HelioDistance('Mars', new Date),
        },
        {
            name: 'Jupiter',
            color: '#ffd89b',
            size: 15,
            orbitalDistance: 116,
            x: Astronomy.HelioVector("Jupiter", new Date).x,
            y: Astronomy.HelioVector("Jupiter", new Date).y,
            distance: Astronomy.HelioDistance('Jupiter', new Date),
        },
        {
            name: 'Saturn',
            color: '#BE985F',
            size: 12,
            orbitalDistance: 156,
            x: Astronomy.HelioVector("Saturn", new Date).x,
            y: Astronomy.HelioVector("Saturn", new Date).y,
            distance: Astronomy.HelioDistance('Saturn', new Date),
        },
        {
            name: 'Uranus',
            color: '#D0F6F8',
            size: 10,
            orbitalDistance: 195,
            x: Astronomy.HelioVector("Uranus", new Date).x,
            y: Astronomy.HelioVector("Uranus", new Date).y,
            distance: Astronomy.HelioDistance('Uranus', new Date),
        },
        {
            name: 'Neptune',
            color: '#344BB2',
            size: 9,
            orbitalDistance: 220,
            x: Astronomy.HelioVector("Neptune", new Date).x,
            y: Astronomy.HelioVector("Neptune", new Date).y,
            distance: Astronomy.HelioDistance('Neptune', new Date),
        },
        {
            name: 'Pluto',
            color: '#41260F',
            size: 1,
            orbitalDistance: 240,
            x: Astronomy.HelioVector("Pluto", new Date).x,
            y: Astronomy.HelioVector("Pluto", new Date).y,
            distance: Astronomy.HelioDistance('Pluto', new Date),
        },
        
        
    ];


    constructor(ctx){
        this.ctx = ctx;
        this.DELTA_ORBIT_RAD = DELTA_ORBIT_RAD;
        this.BIG_ORBIT_FLAG = 1;

        this.planetsArr = this.get_planets_opts();
        this.select_planets = [];
        this.mouse = {x:0, y:0};
        window.addEventListener('wheel', this.scrollResize.bind(this));
        window.addEventListener('click', this.mouseclick.bind(this));

        
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
                        dist: elem.distance,
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
            planet.select = false;
        })
        this.select_planets.forEach(planet => {
            planet.select = true;
        })
    }
    
    mouseclick(e){
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        let planet_count = 0;
        for (let i = 0; i < this.planetsArr.length; i++) {
            const planet = this.planetsArr[i];

            let dist_point = (e.x - planet.x) * (e.x - planet.x) + (e.y - planet.y) * (e.y - planet.y);
            let rad = planet.rad*planet.rad;
            if(dist_point < rad){
                planet_count++;
                if(this.select_planets.length > 0){
                    this.select_planets[1] = planet;
                    // planet.select = true;
                }
                if(this.select_planets.length == 0){
                    this.select_planets[0] = planet;
                    // planet.select = true;
                }
            }
        }
        if(planet_count == 0) this.select_planets.length = 0;
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