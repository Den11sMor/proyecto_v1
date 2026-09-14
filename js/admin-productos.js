// Funciones para administrar los productos desde el panel.

function renderAdminProductos() {
    const c=document.getElementById("tabla-productos");if (!c)return;
    const lista=obtenerProductos();
    c.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Stock crítico</th><th>Categoría</th><th>Acciones</th></tr></thead><tbody>${lista.map(p=>`<tr><td>${p.codigo}</td><td>${p.nombre}</td><td>$${p.precio.toLocaleString("es-CL")}</td><td>${p.stock}</td><td>${p.stockCritico}</td><td>${p.categoria}</td><td><button onclick="editarProducto('${p.codigo}')">Editar</button> <button onclick="eliminarProducto('${p.codigo}')">Eliminar</button></td></tr>`).join("")}</tbody></table></div>`
}

function eliminarProducto(codigo) {
    if (!confirm("¿Eliminar producto?"))return;
    const lista=obtenerProductos().filter(p=>p.codigo!==codigo);guardarProductos(lista);location.reload()
}

function editarProducto(codigo) {localStorage.setItem("productoEditar",codigo);location.href="producto-form.html"}
const fp=document.getElementById("form-producto");
if (fp)fp.addEventListener("submit",e=>{
    e.preventDefault();
    const codigo=document.getElementById("codigo").value.trim(),nombre=document.getElementById("nombre").value.trim(),descripcion=document.getElementById("descripcion").value.trim(),precio=Number(document.getElementById("precio").value),stock=Number(document.getElementById("stock").value),stockCritico=Number(document.getElementById("stockCritico").value),categoria=document.getElementById("categoria").value;
    let lista=obtenerProductos(),editando=localStorage.getItem("productoEditar"),imagen="../img/productos/herramienta.svg";
    if (!codigo||!nombre||precio<0||stock<0||stockCritico<0||!categoria) {alert("Completa correctamente el formulario.");return}
    const existe=lista.findIndex(p=>p.codigo===codigo);
    if (editando) {
        const idx=lista.findIndex(p=>p.codigo===editando);
        if (idx===-1)return;
        lista[idx]={...lista[idx],codigo,nombre,descripcion,precio,stock,stockCritico,categoria};
        localStorage.removeItem("productoEditar");
    } else{
    if (existe!==-1) {alert("El código ya existe.");return}
    lista.push({codigo,nombre,descripcion,precio,stock,stockCritico,categoria,imagen});
}
guardarProductos(lista);alert("Producto guardado.");location.href="productos.html"
})
document.addEventListener("DOMContentLoaded",()=>{
    const edit=localStorage.getItem("productoEditar");if (!edit)return;
    const p=obtenerProductos().find(x=>x.codigo===edit);if (!p)return;
    ["codigo","nombre","descripcion","precio","stock","stockCritico","categoria"].forEach(id=>{const e=document.getElementById(id);if (e)e.value=p[id]})
})
