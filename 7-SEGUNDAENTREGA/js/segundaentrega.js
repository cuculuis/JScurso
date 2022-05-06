///CARACTERISTICAS DE LOS MONSTRUOS////
class Monstruos 
{
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
    constructor(Tipo, Vida) 
    {
        this.TipodePersonaje = Tipo
        this.Vida = Vida
        this.Ataque = 0
        
        if (TipodePersonaje == "VERDE") 
        {
            this.Vida = 500
            this.Ataque = 25
        }
        if (this.TipodePersonaje == "ROJO") 
        {
            this.Vida = 300
            this.Ataque = 100
        }
        if (this.TipodePersonaje == "AZUL") 
        {
            this.Vida = 400
            this.Ataque = 50
        }
    }
}




///VARIABLES INDEPENDIENTES///
let Recorrido = 0
let Camino = 30
let Dado = function() {    
    this.lanzarDado = function() 
    {
        1+Math.round(Math.random()*5);
    }
}


///DESPLAZAMIENTO///
function Desplazamiento() {
    Recorrido = Camino - Dado
    console.log('Te faltan recorrer ' + Recorrido + ' pasos.');
} 

///DATOS DE PERSONAJE///
//let Jugar = prompt('¿Quieres jugar? Por favor escriba "Y" o "N"').toUpperCase()
const Estatus = []

if (Jugar == "Y") {
    let Username = prompt("Introduzca su nombre de usuario").toUpperCase()
    Estatus.push(new Personaje(TipodePersonaje = prompt('Escoja su personaje... Escriba "Verde", "Azul" o "Rojo"').toUpperCase()))
    
    while (Camino > 0 || Seguirjugando != "N") {
        
        switch (Dado) {
            case 1, 3, 5:
                Desplazamiento()
                break;
        
            case 2, 4, 6:
                console.log('¡Ha aparecido una criatura! Es un ' + Criaturas[Math.random*5+1]);
                break;
        }
        let Seguirjugando = prompt('¿Quieres seguir? Escriba "Y" o "N"').toUpperCase()
        if (Seguirjugando != "Y") break
    }
}
////RESPUESTA SI DICE QUE NO////
alert('¡Adios! ¡Vuelve pronto!')


