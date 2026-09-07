// Muestra los productos y permite buscarlos o ver su detalle.

function mostrarProductos(lista=obtenerProductos()) {
    const cont=document.getElementById("lista-productos");if (!cont)return;
    cont.innerHTML="";
    lista.forEach(p=>{
        const card=document.createElement("article");card.className="producto-card";
        card.innerHTML=`<img src="${rutaImagen(p.imagen)}" alt="${p.nombre}"><h3>${p.nombre}</h3><p>${p.descripcion}</p><p><strong>Categoría:</strong> ${p.categoria}</p><p class="precio">$${p.precio.toLocaleString("es-CL")}</p><p>Stock: ${p.stock}</p>${p.stock<=p.stockCritico?'<p class="stock-alerta">Stock crítico</p>':''}<div class="producto-botones"><button onclick="verProducto('${p.codigo}')">Ver detalle</button><button onclick="agregarAlCarrito('${p.codigo}')">Añadir al carrito</button></div>`;
        cont.appendChild(card)
    })
}

function buscarProductos() {
    const texto=(document.getElementById("buscar-producto")?.value||"").toLowerCase();
    mostrarProductos(obtenerProductos().filter(p=>(p.nombre+" "+p.descripcion+" "+p.categoria).toLowerCase().includes(texto)))
}

function verProducto(codigo) {
    localStorage.setItem("productoSeleccionado", codigo);
    window.location.href = "producto-detalle.html";
}
document.addEventListener("DOMContentLoaded",()=>mostrarProductos())
