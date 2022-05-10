///CARACTERISTICAS DE LOS MONSTRUOS////
// class Monstruos 
// {
//     constructor(Nombre, Nivel) {
//         this.Nombre = Nombre.toUpperCase()
//         this.Nivel = Nivel
//         this.Hp = 0
//         if(Nivel == 1) {this.Hp = 50}
//         if(Nivel == 2) {this.Hp = 100}
//         if(Nivel == 3) {this.Hp = 200}
//     }
// }

// const Criaturas = []
// Criaturas.push(new Monstruos('Erizo', 1))
// Criaturas.push(new Monstruos('Pulpo', 2))
// Criaturas.push(new Monstruos('Dragon', 3))
// Criaturas.push(new Monstruos('Lobo', 2))
// Criaturas.push(new Monstruos('Serpiente', 1))
// Criaturas.push(new Monstruos('Demonio', 3))

///CARACTERISTICAS DEL PERSONAJE////
// class Personaje {
//     constructor(Tipo, Vida) 
//     {
//         this.TipodePersonaje = Tipo
//         this.Vida = Vida
//         this.Ataque = 0
        
//         if (TipodePersonaje == "VERDE") 
//         {
//             this.Vida = 500
//             this.Ataque = 25
//         }
//         if (this.TipodePersonaje == "ROJO") 
//         {
//             this.Vida = 300
//             this.Ataque = 100
//         }
//         if (this.TipodePersonaje == "AZUL") 
//         {
//             this.Vida = 400
//             this.Ataque = 50
//         }
//     }
// }




// ///VARIABLES INDEPENDIENTES///
// let Recorrido = 0
// let Camino = 30
function lanzarDado(){    
        dadoLanzado = 1+Math.round(Math.random()*5);
        recorrido =+ dadoLanzado;
        console.log('Te faltan recorrer ' + recorrido + ' pasos.');
}

///DATOS DE PERSONAJE///
let jugar = prompt('¿Quieres jugar? Por favor escriba "Y" o "N"').toUpperCase();

if (jugar === "Y") {
    let username = prompt("Introduzca su nombre de usuario").toUpperCase();
    alert('Hola ' + username + ', Bienvenid@ a la aventura');
    estatus.push(new personaje(personaje.tipodePersonaje = prompt('Escoja su personaje... Escriba "Verde", "Azul" o "Rojo"').toUpperCase()));
    
    while (recorrido < 30 || seguirJugando != "N") {
        
        switch (lanzarDado()) {
            case 1, 3, 5:
                console.log('No pasa nada, avanzas, ahora estás en la casilla' + recorrido);
                break;
        
            case 2, 4, 6:
                console.log('¡Ha aparecido una criatura! Es un ' + criaturas[(Math.random*5)+1]);
                break;
        }
        let seguirJugando = prompt('¿Quieres seguir? Escriba "Y" o "N"').toUpperCase()
        if (seguirJugando != "Y") break;
    }
}
////RESPUESTA SI DICE QUE NO////
alert('¡Adios! ¡Vuelve pronto!')


