// Maneja el carrito de compras y guarda los datos en localStorage.

// El carrito se mantiene en localStorage para conservarlo al cambiar de página.
function obtenerCarrito() {return JSON.parse(localStorage.getItem("carrito")||"[]")}

function guardarCarrito(carrito) {localStorage.setItem("carrito",JSON.stringify(carrito));actualizarContadorCarrito()}

function agregarAlCarrito(codigo,cantidad=1) {
    const lista=obtenerProductos();
    const producto=lista.find(p=>p.codigo===codigo);
    if (!producto) {alert("Producto no encontrado.");return}
    cantidad=Number(cantidad);
    if (!Number.isInteger(cantidad)||cantidad<1) {alert("Cantidad no válida.");return}
    if (cantidad>producto.stock) {alert(`Solo existen ${producto.stock} unidades disponibles.`);return}
    const carrito=obtenerCarrito();
    const existente=carrito.find(p=>p.codigo===codigo);
    if (existente) {
        if (existente.cantidad+cantidad>producto.stock) {alert(`No puedes superar el stock disponible (${producto.stock}).`);return}
        existente.cantidad+=cantidad;
    } else{
    carrito.push({codigo:producto.codigo,nombre:producto.nombre,precio:producto.precio,imagen:producto.imagen,cantidad});
}
guardarCarrito(carrito);
alert("Producto agregado al carrito.");
}

function eliminarDelCarrito(codigo) {let c=obtenerCarrito().filter(p=>p.codigo!==codigo);guardarCarrito(c);mostrarCarrito()}

function cambiarCantidad(codigo,cantidad) {
    const c=obtenerCarrito();const item=c.find(p=>p.codigo===codigo);
    const producto=obtenerProductos().find(p=>p.codigo===codigo);
    if (!item||!producto)return;
    cantidad=Number(cantidad);
    if (cantidad<1) {eliminarDelCarrito(codigo);return}
    if (cantidad>producto.stock) {alert(`Stock máximo: ${producto.stock}`);mostrarCarrito();return}
    item.cantidad=cantidad;guardarCarrito(c);mostrarCarrito()
}

function calcularSubtotal(c) {return c.reduce((t,p)=>t+p.precio*p.cantidad,0)}

function actualizarTotales(c) {
    const subtotal=calcularSubtotal(c),iva=Math.round(subtotal*.19),total=subtotal+iva;
    const s=document.getElementById("subtotal"),i=document.getElementById("iva"),t=document.getElementById("total");
    if (s)s.textContent=`$${subtotal.toLocaleString("es-CL")}`;
    if (i)i.textContent=`$${iva.toLocaleString("es-CL")}`;
    if (t)t.textContent=`$${total.toLocaleString("es-CL")}`;
}

function mostrarCarrito() {
    const cont=document.getElementById("lista-carrito");if (!cont)return;
    const c=obtenerCarrito();cont.innerHTML="";
    if (!c.length) {cont.innerHTML="<p>El carrito está vacío.</p>";actualizarTotales([]);return}
    c.forEach(p=>{
        const d=document.createElement("div");d.className="item-carrito";
        d.innerHTML=`<img src="${p.imagen}" alt="${p.nombre}"><div><h3>${p.nombre}</h3><p>$${p.precio.toLocaleString("es-CL")}</p></div><label>Cantidad <input type="number" min="1" value="${p.cantidad}" onchange="cambiarCantidad('${p.codigo}',this.value)"></label><p>Subtotal: $${(p.precio*p.cantidad).toLocaleString("es-CL")}</p><button onclick="eliminarDelCarrito('${p.codigo}')">Eliminar</button>`;
        cont.appendChild(d);
    });
actualizarTotales(c);actualizarContadorCarrito()
}

function actualizarContadorCarrito() {
    const e=document.getElementById("contador-carrito");if (!e)return;
    e.textContent=obtenerCarrito().reduce((t,p)=>t+p.cantidad,0)
}
document.addEventListener("DOMContentLoaded",()=>{mostrarCarrito();actualizarContadorCarrito()})
