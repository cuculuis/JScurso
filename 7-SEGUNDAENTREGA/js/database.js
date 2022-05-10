let camino = 30
let recorrido = 0
const estatus = [];


const criaturas = 
[
    {name: "Dragon",
    hp: 300,
    lvl: 3,
    attack: 10},
    {name: "Lobo",
    hp: 200,
    lvl: 2,
    attack: 5,},
    {name: "Tigre",
    hp: 200,
    lvl: 2,
    attack: 5,},
    {name: "Serpiente",
    hp: 100,
    lvl: 1,
    attack: 0},
    {name: "Demonio",
    hp: 300,
    lvl: 3,
    attack: 10},
]

function personaje(tipo, vida) {

    this.tipodePersonaje = tipo
    this.vida = vida
    this.ataque = 0
    this.recorrido = 0

    switch (personaje.tipodePersonaje) {
        case "VERDE":
        this.vida = 500
        this.ataque = 25
        break;
    
        case "ROJO": 
        this.vida = 300
        this.ataque = 100
        break;

        case "AZUL": 
        this.vida = 400
        this.ataque = 50
        break;
    }
}