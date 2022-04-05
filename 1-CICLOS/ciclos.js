//Saluda a quien quieras//
let saludo = prompt("Ingresa un nombre para ser Saludado");


while (saludo != "salir") {
    alert("Holaaa " + saludo + ", ¿Cómo estás?");

    saludo = prompt ('¿Quiere saludar a otra persona? Si no es así, escriba exactamente "salir"')
}