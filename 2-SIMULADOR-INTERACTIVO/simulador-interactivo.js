//Variables Usuario//
let nombre = prompt("Ingresa tu nombre");
let edad = parseInt(prompt("Ingrese su edad"));
let sueldoTotaldeHoras = 0;
let sueldoMensual = 0;
let sueldoNetoHora = 0;
let sueldoNetoMes = 0;
let sueldoxHora = 0;
let horasTotales = 0;



//Constantes de impuestos//
const impuesto = 0.17

//FUNCIONES//
function saludo () {
    alert ('Hola ' + nombre + ' su edad es ' + edad + ', ahora va a conocer cuánto gana mensualmente.')
}

saludo();

//PARA SABER SI SU SUELDO ES POR MES O POR HORA//
let modoSueldo = prompt("Si su sueldo es mensual precione 'm' si es por hora precione 'h'");

function SueldoTotalMensualdeHoras() {
    let sueldoTotaldeHoras = sueldoxHora * horasTotales
}

function calSueldoNetoHora () {
    let sueldoNetoHora = (sueldoxHora * horasTotales) - (impuesto * (sueldoxHora * horasTotales))
    alert('Su sueldo total es ' + sueldoNetoHora);
}

function calSueldoNetoMes () {
    let sueldoNetoMes = sueldoMensual - (impuesto * sueldoMensual)
    alert('Su sueldo total es ' + sueldoNetoMes);
}

//Pregunta si el sueldo es mensual u horario//
if (modoSueldo.toLowerCase() == "m") {
    let sueldoMensual = parseInt(prompt("Ingrese su sueldo mensual en bruto"));
    calSueldoNetoMes();
} else if (modoSueldo.toLowerCase() == "h") {
    let sueldoxHora = parseInt(prompt("Ingrese el valor bruto de la hora de trabajo"));
    let horasTotales = parseInt(prompt("Ingrese las horas totales trabajadas"));
    calSueldoNetoHora();
}
