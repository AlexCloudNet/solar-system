//objects
import Star from "../objects/Star.js";
//libs
import {get_random_int, get_random_float} from "../libs/helpers.js";

export default class Stars{
    constructor(ctx){
        this.starsCount = 100;
        this.ctx = ctx;
        this.starsArr = this.get_stars_opts()
    }

    get_stars_opts(){
        let starsArr = [];
            for(let i = 1; i < this.starsCount; i++){
                starsArr.push( new Star(
                        {
                            x: get_random_int(0, canvas.width),
                            y: get_random_int(0, canvas.height),
                            rad: get_random_int(0,3),
                            opacity: get_random_float(0,1),
                            ctx: this.ctx,
                        }
                    )
                )
            }
        return starsArr;
    }

    render(time){
        this.starsArr.forEach(elem => {
            elem.render();
        })
    }

}