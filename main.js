import Stats from "stats.js";

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



const stars_fields = new Stars(ctx_s);
stars_fields.render();

const sun = new Sun(ctx);
const solar_system = new SolarSystem(ctx)


requestAnimationFrame(draw);
function draw(){
    stats.begin();
    ctx.clearRect(0, 0, w, h);

    sun.render();
    solar_system.render();

    stats.end();
    requestAnimationFrame(draw);
}


window.addEventListener('resize', function(){
    w = canvas.width = canvas_stars.width = window.innerWidth;
    h = canvas.height = canvas_stars.height = window.innerHeight;

stars_fields.render();
})

let scrollIcon = document.querySelector('.mouse');
window.addEventListener('wheel', mouseScrollIcon);

function mouseScrollIcon(){
    setTimeout(()=>{
        scrollIcon.style.display = "none";
    }, 2000);
    window.removeEventListener('wheel', mouseScrollIcon);
}
