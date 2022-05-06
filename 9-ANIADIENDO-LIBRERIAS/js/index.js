let EnviodeFormulario     = document.getElementById("Formulario");
EnviodeFormulario.addEventListener("submit", CheckFormulario);

function CheckFormulario(e){
    e.preventDefault();
    alert("Formulario Enviado");    

}
