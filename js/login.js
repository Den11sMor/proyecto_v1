// Controla el inicio de sesión y el tipo de usuario.

const fl=// Comprueba los datos ingresados antes de iniciar sesión.
document.getElementById("form-login");
if (fl)fl.addEventListener("submit",e=>{
    e.preventDefault();
    const correo=document.getElementById("login-correo").value.trim().toLowerCase(),password=document.getElementById("login-password").value,error=document.getElementById("error-login");
    error.textContent="";
    if (!validarCorreo(correo)) {error.textContent="Correo no permitido.";return}
    if (!validarPassword(password)) {error.textContent="Contraseña entre 4 y 10 caracteres.";return}
    const usuarios=JSON.parse(localStorage.getItem("usuarios")||"[]");
    const u=usuarios.find(x=>x.correo===correo&&x.password===password);
    if (!u) {error.textContent="Correo o contraseña incorrectos.";return}
    if (u.activo===false) {error.textContent="Usuario desactivado.";return}
    localStorage.setItem("usuarioActual",JSON.stringify(u));
    if (u.rol==="ADMIN"||u.rol==="VENDEDOR")location.href="../admin/index.html";else location.href="../index.html";
})