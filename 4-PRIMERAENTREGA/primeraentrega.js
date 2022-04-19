///CARACTERISTICAS DE LOS MONSTRUOS////
class Monstruos {
    constructor(Nombre, Nivel) {
        this.Nombre = Nombre.toUpperCase()
        this.Nivel = Nivel
        this.Hp = 0
        if(Nivel == 1) {this.Hp = 50}
        if(Nivel == 2) {this.Hp = 100}
        if(Nivel == 3) {this.Hp = 200}
    }
}

const Criaturas = []
Criaturas.push(new Monstruos('Erizo', 1))
Criaturas.push(new Monstruos('Pulpo', 2))
Criaturas.push(new Monstruos('Dragon', 3))
Criaturas.push(new Monstruos('Lobo', 2))
Criaturas.push(new Monstruos('Serpiente', 1))
Criaturas.push(new Monstruos('Demonio', 3))

///CARACTERISTICAS DEL PERSONAJE////
class Personaje {
    constructor(Tipo, Vida) {
        this.TipodePersonaje = Tipo
        this.Vida = Vida
        this.Ataque = 0
        
        if (TipodePersonaje == "VERDE") {
            this.Vida = 500
            this.Ataque = 25
        }
        if (this.TipodePersonaje == "ROJO") {
            this.Vida = 300
            this.Ataque = 100
        }
        if (this.TipodePersonaje == "AZUL") {
            this.Vida = 400
            this.Ataque = 50
        }
    }
}

///LANZAMIENTO DE DADO////
function LanzarDado() {
    let Dado = 1+Math.round(Math.random()*5);
    return Dado;
}

///VARIABLES INDEPENDIENTES///
let Recorrido = 0
let Camino = 30

///CAMINAR///
function Caminar() {
    let Pasos = 0
    Pasos = LanzarDado()
    console.log('Has dado ' + Pasos + ' pasos.');
    return Pasos;
}

///DESPLAZAMIENTO///
function Desplazamiento() {
    Recorrido = Camino - Caminar()
    console.log('Te faltan recorrer ' + Recorrido + ' pasos.');
} 

///DATOS DE PERSONAJE///
let Jugar = prompt('¿Quieres jugar? (Y/N)').toUpperCase()
let Username = prompt("Introduzca su nombre de usuario").toUpperCase()
const Estatus = []
Estatus.push(new Personaje(TipodePersonaje = prompt('Escoja su personaje... Escriba "Verde", "Azul" o "Rojo"').toUpperCase()))

if (Jugar == "Y") {
    do {
        LanzarDado()

        switch (LanzarDado()) {
            case 1, 3, 5:
                Caminar()
                Desplazamiento()
                break;
        
            case 2, 4, 6:
                console.log('¡Ha aparecido una criatura! Es un ' + Criaturas.indexOf[Math.random*5+1]);
                break;
        }
    }while (Recorrido <= 0 || Criaturas.length == 0)
} else {
    alert('¡Adios! ¡Vuelve pronto!')
}



// switch (key) {
//     case value:
        
//         break;

//     default:
//         break;
// }


// const arr = [2, 5, 4, 45, 32, 46, 78, 87, 98, 56, 23, 12];
//     const chooseRandom = (arr, num = 1) => {
//         const res = [];
//         for(let i = 0; i < num; ){
//           const random = Math.floor(Math.random() * arr.length);
//             if(res.indexOf(arr[random]) !== -1){
//                 continue;
//             };
//             res.push(arr[random]);
//             i++;
//         };
//         return res;
//     };
//     console.log(chooseRandom(arr, 4));

