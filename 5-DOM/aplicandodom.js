//CODIGO JS
let Nombre = prompt('¿Cuál es tu nombre?').toUpperCase()
let Pregunta = prompt('¿Quieres eliminar la lista? (Y/N)').toUpperCase()
let Pregunta2 = prompt('¿Quieres Saber los estados de la lista? (Y/N)').toUpperCase()

Saludar = document.getElementsByClassName("Saludo")
Saludar.innerHTML = "<h2>¡Hola " + Nombre + "!</h2>"

const Estados = [
    {id: 1, nombre: 'Buenos Aires', poblacion: 100},
    {id: 2, nombre: 'Canberra', poblacion: 200},
    {id: 3, nombre: 'Caracas', poblacion: 50}
]

if (Pregunta == 'Y') {
        const Paises = document.getElementsByClassName('Paises')
        for (let i = 0; i < Paises.length; i++) {
            Paises[0].remove()
        }
} else {
    console.log('Usted decidió no borrar paises');

    if (Pregunta2 == 'Y') {
        const divPadre = document.getElementsByTagName('div')[0]
        for (const Estado of Estados) {
            const div = document.createElement('div')
            div.innerHTML = `
                <div id='p-${Estado.id}'>
                    <h3>ID: ${Estado.id}</h3>
                    <p> Estado: ${Estado.nombre} </p>
                    <b class='Estados'> $ ${Estado.poblacion}</b>
                <div>
                <hr>`
            
        }
    }
}
