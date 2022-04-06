//Variables Usuario//
let nombre = prompt("Ingresa tu nombre");
let edad = parseInt(prompt("Ingrese su edad"));
let mdSueldo = prompt("Si su sueldo es mensual precione 'm' si es por hora precione 'h'");

//Constantes de impuestos//
const impuesto = 0.17

//Pregunta si el sueldo es mensual u horario//
if (mdSueldo.toLowerCase == "m") {
    let sueldoM = parseInt(prompt("Ingrese su sueldo mensual en bruto"));
} else if (mdSueldo.toLowerCase == "h") {
    let sueldoH = parseInt(prompt("Ingrese el valor bruto de la hora de trabajo"));
    let hTotal = parseInt(prompt("Ingrese las horas totales trabajadas"));
}


