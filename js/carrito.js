// Maneja el carrito y mantiene los datos guardados en el navegador.

function obtenerCarrito() {
    return JSON.parse(
        localStorage.getItem("carrito") || "[]"
    );
}

function guardarCarrito(carrito) {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContadorCarrito();
}

function agregarAlCarrito(codigo, cantidad = 1) {

    const productos = obtenerProductos();

    const producto = productos.find(
        p => p.codigo === codigo
    );

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    cantidad = Number(cantidad);

    if (!Number.isInteger(cantidad) || cantidad < 1) {
        alert("Cantidad no válida.");
        return;
    }

    if (cantidad > producto.stock) {
        alert(
            `Solo existen ${producto.stock} unidades disponibles.`
        );

        return;
    }

    const carrito = obtenerCarrito();

    const existente = carrito.find(
        p => p.codigo === codigo
    );

    if (existente) {

        if (
            existente.cantidad + cantidad >
            producto.stock
        ) {

            alert(
                `No puedes superar el stock disponible (${producto.stock}).`
            );

            return;
        }

        existente.cantidad += cantidad;

    } else {

        carrito.push({

            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad

        });
    }

    guardarCarrito(carrito);

    alert("Producto agregado al carrito.");
}

function eliminarDelCarrito(codigo) {

    const carrito =
        obtenerCarrito().filter(
            producto =>
                producto.codigo !== codigo
        );

    guardarCarrito(carrito);

    mostrarCarrito();
}

function cambiarCantidad(codigo, cantidad) {

    const carrito = obtenerCarrito();

    const item = carrito.find(
        producto =>
            producto.codigo === codigo
    );

    const producto =
        obtenerProductos().find(
            p => p.codigo === codigo
        );

    if (!item || !producto) {
        return;
    }

    cantidad = Number(cantidad);

    if (cantidad < 1) {
        eliminarDelCarrito(codigo);
        return;
    }

    if (cantidad > producto.stock) {

        alert(
            `Stock máximo: ${producto.stock}`
        );

        mostrarCarrito();

        return;
    }

    item.cantidad = cantidad;

    guardarCarrito(carrito);

    mostrarCarrito();
}

function calcularSubtotal(carrito) {

    return carrito.reduce(
        (total, producto) =>
            total +
            producto.precio *
            producto.cantidad,
        0
    );
}

function actualizarTotales(carrito) {

    const subtotal =
        calcularSubtotal(carrito);

    const iva =
        Math.round(subtotal * 0.19);

    const total =
        subtotal + iva;

    const elementoSubtotal =
        document.getElementById("subtotal");

    const elementoIva =
        document.getElementById("iva");

    const elementoTotal =
        document.getElementById("total");

    if (elementoSubtotal) {

        elementoSubtotal.textContent =
            `$${subtotal.toLocaleString("es-CL")}`;
    }

    if (elementoIva) {

        elementoIva.textContent =
            `$${iva.toLocaleString("es-CL")}`;
    }

    if (elementoTotal) {

        elementoTotal.textContent =
            `$${total.toLocaleString("es-CL")}`;
    }
}

function mostrarCarrito() {

    const contenedor =
        document.getElementById("lista-carrito");

    if (!contenedor) {
        return;
    }

    const carrito =
        obtenerCarrito();

    contenedor.innerHTML = "";

    if (carrito.length === 0) {

        contenedor.innerHTML =
            "<p>El carrito está vacío.</p>";

        actualizarTotales([]);

        actualizarContadorCarrito();

        return;
    }

    carrito.forEach(producto => {

        const elemento =
            document.createElement("div");

        elemento.className =
            "item-carrito";

        elemento.innerHTML = `

            <img
                src="${rutaImagen(producto.imagen)}"
                alt="${producto.nombre}"
            >

            <div>

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    $${producto.precio.toLocaleString("es-CL")}
                </p>

            </div>

            <label>

                Cantidad

                <input
                    type="number"
                    min="1"
                    max="${producto.stock}"
                    value="${producto.cantidad}"
                    onchange="
                        cambiarCantidad(
                            '${producto.codigo}',
                            this.value
                        )
                    "
                >

            </label>

            <p>
                Subtotal:
                $${(
                    producto.precio *
                    producto.cantidad
                ).toLocaleString("es-CL")}
            </p>

            <button
                onclick="
                    eliminarDelCarrito(
                        '${producto.codigo}'
                    )
                "
            >
                Eliminar
            </button>
        `;

        contenedor.appendChild(elemento);
    });

    actualizarTotales(carrito);

    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {

    const elemento =
        document.getElementById(
            "contador-carrito"
        );

    if (!elemento) {
        return;
    }

    const cantidad =
        obtenerCarrito().reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );

    elemento.textContent = cantidad;
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarCarrito();

        actualizarContadorCarrito();

    }
);