class Monstruos {
    constructor(nombre, nivel) {
        this.nombre = nombre.toUpperCase()
        this.nivel = nivel
    }
}

switch (key) {
    case value:
        
        break;

    default:
        break;
}


const arr = [2, 5, 4, 45, 32, 46, 78, 87, 98, 56, 23, 12];
    const chooseRandom = (arr, num = 1) => {
        const res = [];
        for(let i = 0; i < num; ){
          const random = Math.floor(Math.random() * arr.length);
            if(res.indexOf(arr[random]) !== -1){
                continue;
            };
            res.push(arr[random]);
            i++;
        };
        return res;
    };
    console.log(chooseRandom(arr, 4));

