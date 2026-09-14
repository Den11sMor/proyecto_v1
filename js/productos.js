// Muestra los productos y permite buscarlos o ver su detalle.

function mostrarProductos(
    lista = obtenerProductos()
) {

    const contenedor =
        document.getElementById(
            "lista-productos"
        );

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "producto-card";

        tarjeta.innerHTML = `

            <img
                src="${rutaImagen(producto.imagen)}"
                alt="${producto.nombre}"
            >

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                ${producto.descripcion}
            </p>

            <p>
                <strong>Categoría:</strong>
                ${producto.categoria}
            </p>

            <p class="precio">
                $${producto.precio.toLocaleString("es-CL")}
            </p>

            <p>
                Stock: ${producto.stock}
            </p>

            ${
                producto.stock <= producto.stockCritico
                    ? '<p class="stock-alerta">Stock crítico</p>'
                    : ""
            }

            <div class="producto-botones">

                <button
                    type="button"
                    onclick="
                        verProducto(
                            '${producto.codigo}'
                        )
                    ">
                    Ver detalle
                </button>

                <button
                    type="button"
                    onclick="
                        agregarAlCarrito(
                            '${producto.codigo}'
                        )
                    ">
                    Añadir al carrito
                </button>

            </div>

        `;

        contenedor.appendChild(tarjeta);
    });
}

// Permite buscar productos por nombre,
// descripción o categoría.
function buscarProductos() {

    const campo =
        document.getElementById(
            "buscar-producto"
        );

    const texto =
        (campo?.value || "")
            .trim()
            .toLowerCase();

    const productos =
        obtenerProductos();

    const resultados =
        productos.filter(producto => {

            const informacion =
                producto.nombre +
                " " +
                producto.descripcion +
                " " +
                producto.categoria;

            return informacion
                .toLowerCase()
                .includes(texto);
        });

    mostrarProductos(resultados);
}

// Guarda el producto seleccionado y
// abre la página correspondiente.
function verProducto(codigo) {

    localStorage.setItem(
        "productoSeleccionado",
        codigo
    );

    const rutaActual =
        window.location.pathname;

    if (rutaActual.includes("/pages/")) {

        window.location.href =
            "producto-detalle.html";

    } else {

        window.location.href =
            "pages/producto-detalle.html";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarProductos();

    }
);