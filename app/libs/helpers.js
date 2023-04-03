export function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function get_random_float(min, max) {
   let num = Math.random() * (max - min) + min;
   return Math.floor(num*100) / 100;
}

export function getRandomTIme(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    let random = Math.floor( Math.random() * (max - min + 1)) + min;
    console.log(random);
    return random;
}