import Stats from "stats.js";

import { Viewport } from "./app/engine/Viewport";
import Stars from "./app/layers/Stars";
import Sun from "./app/layers/Sun";
import SolarSystem from "./app/layers/SolarSystem";

const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const canvas_stars = document.getElementById('stars');
let ctx_s = canvas_stars.getContext('2d');

let w = canvas.width = canvas_stars.width = window.innerWidth,
    h = canvas.height = canvas_stars.height = window.innerHeight;
const render_opts ={
    zoom_font: 1,
}

const viewport = new Viewport(canvas, render_opts);

const stars_fields = new Stars(ctx_s);
stars_fields.render();

const sun = new Sun(ctx);
const solar_system = new SolarSystem(ctx)



requestAnimationFrame(draw);
function draw(){
    stats.begin();
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(viewport.center.x, viewport.center.y);
    ctx.scale(1/viewport.zoom, 1/viewport.zoom);
    const offset = viewport.getOffset();
    ctx.translate(offset.x, offset.y);

    render_opts.zoom_font = viewport.zoom;

    solar_system.render(render_opts);
    sun.render();

    ctx.restore();
    stats.end();
    requestAnimationFrame(draw);
}


window.addEventListener('resize', function(){
    w = canvas.width = canvas_stars.width = window.innerWidth;
    h = canvas.height = canvas_stars.height = window.innerHeight;

stars_fields.render();
})

let scrollIcon = document.querySelector('.mouse');
let clickIcon = document.querySelector('.mouse_click');

window.addEventListener('wheel', mouseScrollIcon);
window.addEventListener('mousedown', mouseDownIcon);


function mouseDownIcon(){
    setTimeout(()=>{
        clickIcon.style.display = "none";
    }, 2000);
    window.removeEventListener('mousedown', mouseDownIcon);
}
function mouseScrollIcon(){
    setTimeout(()=>{
        scrollIcon.style.display = "none";
    }, 2000);
    window.removeEventListener('wheel', mouseScrollIcon);
}
