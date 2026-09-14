// Registra usuarios y valida los datos ingresados.

const fr=document.getElementById("form-registro");
if (fr)fr.addEventListener("submit",e=>{
    e.preventDefault();
    const run=document.getElementById("run").value.trim().toUpperCase(),nombre=document.getElementById("nombre").value.trim(),apellidos=document.getElementById("apellidos").value.trim(),correo=document.getElementById("correo").value.trim().toLowerCase(),password=document.getElementById("password").value,direccion=document.getElementById("direccion").value.trim(),region=document.getElementById("region").value,comuna=document.getElementById("comuna").value;
    if (!validarRUN(run)) {alert("RUN inválido.");return}
    if (!validarCorreo(correo)) {alert("Correo no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.");return}
    if (!validarPassword(password)) {alert("La contraseña debe tener entre 4 y 10 caracteres.");return}
    if (!nombre||nombre.length>50||!apellidos||apellidos.length>100||!direccion||direccion.length>300||!region||!comuna) {alert("Completa correctamente todos los campos.");return}
    let usuarios=JSON.parse(localStorage.getItem("usuarios")||"[]");
    if (usuarios.some(u=>u.run===run||u.correo===correo)) {alert("RUN o correo ya registrado.");return}
    usuarios.push({run,nombre,apellidos,correo,password,direccion,region,comuna,rol:"CLIENTE",activo:true});
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    alert("Usuario registrado correctamente.");location.href="login.html";
})
