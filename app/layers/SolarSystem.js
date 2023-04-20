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
            x: Astronomy.HelioVector("Mercury", new Date()).x,
            y: Astronomy.HelioVector("Mercury", new Date()).y,
            apsis_x: Astronomy.HelioVector("Mercury", Astronomy.SearchPlanetApsis('Mercury', new Date).time).x,
            apsis_y: Astronomy.HelioVector("Mercury", Astronomy.SearchPlanetApsis('Mercury', new Date).time).y,
            next_apsis_x: Astronomy.HelioVector("Mercury", Astronomy.NextPlanetApsis('Mercury', Astronomy.SearchPlanetApsis('Mercury', new Date)).time).x,
            next_apsis_y: Astronomy.HelioVector("Mercury", Astronomy.NextPlanetApsis('Mercury', Astronomy.SearchPlanetApsis('Mercury', new Date)).time).y,
        },
        {
            name: 'Venus',
            color: '#BA8B02',
            size: 4.7,
            orbitalDistance: 50,
            x: Astronomy.BaryState("Venus", new Date()).x,
            y: Astronomy.BaryState("Venus", new Date()).y,
            apsis_x: Astronomy.BaryState("Venus", Astronomy.SearchPlanetApsis('Venus', new Date).time).x,
            apsis_y: Astronomy.BaryState("Venus", Astronomy.SearchPlanetApsis('Venus', new Date).time).y,
            next_apsis_x: Astronomy.BaryState("Venus", Astronomy.NextPlanetApsis('Venus', Astronomy.SearchPlanetApsis('Venus', new Date)).time).x,
            next_apsis_y: Astronomy.BaryState("Venus", Astronomy.NextPlanetApsis('Venus', Astronomy.SearchPlanetApsis('Venus', new Date)).time).y,
        },
        {
            name: 'Earth',
            color: '#43c6ac',
            size: 5,
            orbitalDistance: 70,
            x: Astronomy.BaryState("Earth", new Date()).x,
            y: Astronomy.BaryState("Earth", new Date()).y,
            apsis_x: Astronomy.BaryState("Earth", Astronomy.SearchPlanetApsis('Earth', new Date).time).x,
            apsis_y: Astronomy.BaryState("Earth", Astronomy.SearchPlanetApsis('Earth', new Date).time).y,
            next_apsis_x: Astronomy.BaryState("Earth", Astronomy.NextPlanetApsis('Earth', Astronomy.SearchPlanetApsis('Earth', new Date)).time).x,
            next_apsis_y: Astronomy.BaryState("Earth", Astronomy.NextPlanetApsis('Earth', Astronomy.SearchPlanetApsis('Earth', new Date)).time).y,

        },
        {
            name: 'Mars',
            color: '#EB5757',
            size: 2.6,
            orbitalDistance: 90,
            x: Astronomy.BaryState("Mars", new Date()).x,
            y: Astronomy.BaryState("Mars", new Date()).y,
            apsis_x: Astronomy.BaryState("Mars", Astronomy.SearchPlanetApsis('Mars', new Date).time).x,
            apsis_y: Astronomy.BaryState("Mars", Astronomy.SearchPlanetApsis('Mars', new Date).time).y,
            next_apsis_x: Astronomy.BaryState("Mars", Astronomy.NextPlanetApsis('Mars', Astronomy.SearchPlanetApsis('Mars', new Date)).time).x,
            next_apsis_y: Astronomy.BaryState("Mars", Astronomy.NextPlanetApsis('Mars', Astronomy.SearchPlanetApsis('Mars', new Date)).time).y,

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
        {
            name: 'SSB',
            color: '#FFFFFF',
            size: 1,
            orbit: false,
            orbitalDistance: 1,
            x: Astronomy.HelioState("SSB", new Date, false).x,
            y: Astronomy.HelioState("SSB", new Date, false).y,
        },
        // {
        //     name: 'EMB',
        //     color: '#FFFFFF',
        //     size: 1,
        //     orbit: false,
        //     orbitalDistance: 1,
        //     x: Astronomy.HelioVector("EMB", new Date, false).x,
        //     y: Astronomy.HelioVector("EMB", new Date, false).y,
        // },
        
        
    ];


    constructor(ctx){
        this.ctx = ctx;
        this.DELTA_ORBIT_RAD = DELTA_ORBIT_RAD;
        this.BIG_ORBIT_FLAG = 1;

        this.planetsArr = this.get_planets_opts();
        window.addEventListener('wheel', this.scrollResize.bind(this));
        
        // window.addEventListener('mousemove', this.moveScreen.bind(this));
        // window.addEventListener('mouseup', this.moveScreen.bind(this));
        // расстояние до солнца в ае
        // console.log(Astronomy.HelioVector("Mars", new Date).Length()*150)
        // console.log(Astronomy.HelioVector("Mars", new Date, false));
        // console.log( Astronomy.BaryState("Mars", new Date()) );
        // console.log(Astronomy.BaryState("Sun", new Date, false));
        // console.log(Astronomy.HelioVector("SSB", new Date, false));
        // console.log(Astronomy.SearchPlanetApsis('Mars', new Date));

        //Апоцентр и перицентр
        // console.log(
        //     Astronomy.BaryState('Mars', Astronomy.SearchPlanetApsis('Mars', new Date).time),
        //     Astronomy.BaryState("Mars", Astronomy.NextPlanetApsis('Mars', Astronomy.SearchPlanetApsis('Mars', new Date)).time)
        //     );
        this.apsis_0 = Astronomy.BaryState('Mars', Astronomy.SearchPlanetApsis('Mars', new Date).time);
        this.apsis_1 = Astronomy.BaryState("Mars", Astronomy.NextPlanetApsis('Mars', Astronomy.SearchPlanetApsis('Mars', new Date)).time);
        this.lenght_0 = Math.hypot(this.apsis_0.x, this.apsis_0.y, this.apsis_0.z);
        this.lenght_1 = Math.hypot(this.apsis_1.x, this.apsis_1.y, this.apsis_1.z);

        this.center = (this.lenght_0 + this.lenght_1) / 2;

        // this.orbit_rad = Math.hypot()
        //     console.log(
        //         Astronomy.NextPlanetApsis('Mars', Astronomy.NextPlanetApsis('Mars', Astronomy.SearchPlanetApsis('Mars', new Date) ) )
        //         );

        // console.log(Astronomy.HelioVector("Mars", Astronomy.SearchPlanetApsis('Mars', new Date).time));


    }

    get_planet_vector(){

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
                        orbit: !elem.orbit ? Math.hypot(catX, catY) : elem.orbit,
                        ctx: this.ctx,
                        BIG_ORBIT_FLAG: this.BIG_ORBIT_FLAG,

                        apsis_x: elem.apsis_x * this.DELTA_ORBIT_RAD + SUN_OPTS.x || false,
                        apsis_y: elem.apsis_y * this.DELTA_ORBIT_RAD + SUN_OPTS.y || false,
                        next_apsis_x: elem.next_apsis_x * this.DELTA_ORBIT_RAD + SUN_OPTS.x || false,
                        next_apsis_y: elem.next_apsis_y * this.DELTA_ORBIT_RAD + SUN_OPTS.x || false,

                        center: this.center || false
                    }
                )
            );
    
        })
    
        return planetsArr;
    }

    render(){
        this.planetsArr.forEach(planet => {
            planet.render_planet();
            planet.render_apsis();
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