export class Viewport{
    constructor(cnv){
        this.cnv = cnv;
        this.zoom = 1;
        this.center = {x:cnv.width/2, y:cnv.height/2};
        this.offset = {x:0,y:0};
        this.drag = {
            start:{x:0,y:0},
            end:{x:0,y:0},
            offset:{x:0,y:0},
            active: false,
        }


        this.#addEventListeners();
    }

    getMouse(e){
        return {
            x: e.offsetX * this.zoom,
            y: e.offsetY * this.zoom,
        }
    }
    getOffset(){
        return {
            x: this.offset.x + this.drag.offset.x,
            y: this.offset.y + this.drag.offset.y,
        }
    }
    #addEventListeners(){
        this.cnv.addEventListener("mousewheel", this.#handleMouseWheel.bind(this))
        this.cnv.addEventListener("mousedown", this.#handleMouseDown.bind(this))
        this.cnv.addEventListener("mousemove", this.#handleMouseMove.bind(this))
        this.cnv.addEventListener("mouseup", this.#handleMouseUp.bind(this))

    }
    #handleMouseDown(e){
        if(e.button == 1){
            this.drag.start = this.getMouse(e);
            this.drag.active = true;
        }
    }
    #handleMouseMove(e){
        if(this.drag.active){
            this.drag.end = this.getMouse(e);
            this.drag.offset = {
                x: this.drag.end.x - this.drag.start.x,
                y: this.drag.end.y - this.drag.start.y,
            }
        }
    }
    #handleMouseUp(e){
        if(this.drag.active){
            this.offset = {
                x: this.offset.x + this.drag.offset.x,
                y: this.offset.y + this.drag.offset.y,
            }
            this.drag = {
                start:{x:0,y:0},
                end:{x:0,y:0},
                offset:{x:0,y:0},
                active: false,
            }
        }
    }

    #handleMouseWheel(e){
        const dir = Math.sign(e.deltaY);
        const step = 0.2;
        this.zoom += dir*step;
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }
}