// Valida y procesa el formulario de contacto.

const fc=document.getElementById("form-contacto");
if (fc)fc.addEventListener("submit",e=>{
    e.preventDefault();
    const nombre=document.getElementById("contacto-nombre").value.trim(),correo=document.getElementById("contacto-correo").value.trim(),mensaje=document.getElementById("contacto-mensaje").value.trim();
    if (!nombre||nombre.length>100) {alert("Nombre obligatorio, máximo 100 caracteres.");return}
    if (correo&&!validarCorreo(correo)) {alert("Correo no válido.");return}
    if (!mensaje||mensaje.length>500) {alert("Mensaje obligatorio, máximo 500 caracteres.");return}
    alert("Mensaje enviado correctamente.");fc.reset()
})
