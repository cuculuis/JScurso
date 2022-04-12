//Variables Usuario//
let nombre = prompt("Ingresa tu nombre");
let edad = parseInt(prompt("Ingrese su edad"));
let sueldoTotaldeHoras = 0;
let sueldoMensual = 0;
let sueldoNetoHora = 0;
let sueldoNetoMes = 0;
let sueldoxHora = 0;
let horasTotales = 0;
let sueldoHoraTotal = 0;
let sueldoImpuestoHora = 0;
let sueldoImpuestoMes = 0;



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
    sueldoTotaldeHoras = sueldoxHora * horasTotales
}

function calSueldoNetoHora () {
    sueldoHoraTotal = sueldoxHora * horasTotales;
    sueldoImpuestoHora = impuesto * sueldoHoraTotal;
    sueldoNetoHora = sueldoHoraTotal - sueldoImpuestoHora;
    alert('Su sueldo total es ' + sueldoNetoHora);
}

function calSueldoNetoMes () {
    sueldoImpuestoMes = impuesto * sueldoMensual;
    sueldoNetoMes = sueldoMensual - sueldoImpuestoMes;
    alert('Su sueldo total es ' + sueldoNetoMes);
}

//Pregunta si el sueldo es mensual u horario//
if (modoSueldo.toLowerCase() == "m") {
    sueldoMensual = parseInt(prompt("Ingrese su sueldo mensual en bruto"));
    calSueldoNetoMes();
} else if (modoSueldo.toLowerCase() == "h") {
    sueldoxHora = parseInt(prompt("Ingrese el valor bruto de la hora de trabajo"));
    horasTotales = parseInt(prompt("Ingrese las horas totales trabajadas"));
    calSueldoNetoHora();
}
