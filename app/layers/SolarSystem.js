import {Astronomy} from "../libs/astronomy";

import {
    SUN_OPTS
} from "../../opts";

import Planet from "../objects/Planet.js";

export default class SolarSystem{
    planetsCoord = Astronomy.Body;
    planetsOpts = [
        {
            name: 'Mercury',
            color: '#bdc3c7',
            size: 2,
            orbitalDistance: 36,
            x: this.planetsCoord[1].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[1].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Venus',
            color: '#BA8B02',
            size: 4.7,
            orbitalDistance: 50,
            x: this.planetsCoord[2].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[2].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Earth',
            color: '#43c6ac',
            size: 5,
            orbitalDistance: 70,
            x: this.planetsCoord[3].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[3].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Mars',
            color: '#EB5757',
            size: 2.6,
            orbitalDistance: 90,
            x: this.planetsCoord[5].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[5].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y, 
        },
        {
            name: 'Jupiter',
            color: '#ffd89b',
            size: 15,
            orbitalDistance: 116,
            x: this.planetsCoord[16].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[16].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Saturn',
            color: '#BE985F',
            size: 12,
            orbitalDistance: 156,
            x: this.planetsCoord[17].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[17].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Uranus',
            color: '#D0F6F8',
            size: 10,
            orbitalDistance: 195,
            x: this.planetsCoord[18].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[18].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Neptune',
            color: '#344BB2',
            size: 9,
            orbitalDistance: 220,
            x: this.planetsCoord[19].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[19].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        {
            name: 'Pluto',
            color: '#41260F',
            size: 1,
            orbitalDistance: 240,
            x: this.planetsCoord[20].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).x,
            y: this.planetsCoord[20].EclipticCartesianCoordinates(Astronomy.DayValue(new Date())).y,
        },
        
        
    ];

    constructor(ctx){
        this.ctx = ctx;
        this.DELTA_ORBIT_RAD = 150;
        this.BIG_ORBIT_FLAG = 1;

        this.planetsArr = this.get_planets_opts();
        window.addEventListener('wheel', this.scrollResize.bind(this));
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