//CODIGO JS
let Nombre = prompt('¿Cuál es tu nombre?').toUpperCase()
let Pregunta = prompt('¿Quieres eliminar la lista? (Y/N)').toUpperCase()
let Pregunta2 = prompt('¿Quieres Saber los estados de la lista? (Y/N)').toUpperCase()

Saludar = document.createElement("h2")
Saludar.innerHTML = "<h2>¡Hola " + Nombre + "!</h2>"
document.body.append(Saludar);

const Estados = [
    {id: 1, nombre: 'Buenos Aires', poblacion: 100},
    {id: 2, nombre: 'Canberra', poblacion: 200},
    {id: 3, nombre: 'Caracas', poblacion: 50}
]

if (Pregunta == 'Y') {
        const Paises = document.getElementsByClassName('paises')
        for (let i = 0; i < 3; i++) {
            Paises[0].remove()
        }
} else {
    console.log('Usted decidió no borrar paises');

    if (Pregunta2 == 'Y') {
        for (const Estado of Estados) {
            let contenedor = document.createElement('div')
            contenedor.innerHTML = `
                    <h3>ID: ${Estado.id}</h3>
                    <p> Estado: ${Estado.nombre} </p>
                    <b class='Estados'>Población $ ${Estado.poblacion}</b>
                <div>
                <hr>`
            document.body.appendChild(contenedor);
        }
    }
}
