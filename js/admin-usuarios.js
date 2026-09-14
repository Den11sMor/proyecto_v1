// Funciones para administrar los usuarios desde el panel.

function obtenerUsuarios() {return JSON.parse(localStorage.getItem("usuarios")||"[]")}

function guardarUsuarios(u) {localStorage.setItem("usuarios",JSON.stringify(u))}

// Actualiza la tabla de usuarios del administrador.
function mostrarUsuarios() {
    const c=document.getElementById("tabla-usuarios");if (!c)return;
    const u=obtenerUsuarios();
    c.innerHTML=`<div class="table-wrap"><table><thead><tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${u.map(x=>`<tr><td>${x.run}</td><td>${x.nombre} ${x.apellidos}</td><td>${x.correo}</td><td>${x.rol}</td><td>${x.activo===false?"Inactivo":"Activo"}</td><td><button onclick="cambiarEstado('${x.run}')">Cambiar estado</button> <button onclick="eliminarUsuario('${x.run}')">Eliminar</button></td></tr>`).join("")}</tbody></table></div>`
}

function cambiarEstado(run) {const u=obtenerUsuarios(),x=u.find(a=>a.run===run);if (x) {x.activo=x.activo===false;guardarUsuarios(u);mostrarUsuarios()}}

function eliminarUsuario(run) {if (!confirm("¿Eliminar usuario?"))return;guardarUsuarios(obtenerUsuarios().filter(x=>x.run!==run));mostrarUsuarios()}
const fu=document.getElementById("form-usuario");
if (fu)fu.addEventListener("submit",e=>{
    e.preventDefault();
    const run=document.getElementById("run").value.trim().toUpperCase(),nombre=document.getElementById("nombre").value.trim(),apellidos=document.getElementById("apellidos").value.trim(),correo=document.getElementById("correo").value.trim().toLowerCase(),password=document.getElementById("password").value,rol=document.getElementById("rol").value;
    if (!validarRUN(run)||!validarCorreo(correo)||!nombre||!apellidos||!validarPassword(password)||!rol) {alert("Datos inválidos.");return}
    let u=obtenerUsuarios();if (u.some(x=>x.run===run||x.correo===correo)) {alert("RUN o correo ya existe.");return}
    u.push({run,nombre,apellidos,correo,password,rol,activo:true,direccion:"",region:"",comuna:""});guardarUsuarios(u);alert("Usuario creado.");location.href="usuarios.html"
})
