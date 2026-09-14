// Funciones para administrar los productos
// desde el panel de administración.

function renderAdminProductos() {

    const contenedor =
        document.getElementById("tabla-productos");

    if (!contenedor) {
        return;
    }

    const productos =
        obtenerProductos();

    if (productos.length === 0) {

        contenedor.innerHTML =
            "<p>No existen productos registrados.</p>";

        return;
    }

    contenedor.innerHTML = `

        <div class="table-wrap">

            <table>

                <thead>

                    <tr>

                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Stock crítico</th>
                        <th>Categoría</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    ${productos.map(producto => `

                        <tr>

                            <td>
                                ${producto.codigo}
                            </td>

                            <td>
                                ${producto.nombre}
                            </td>

                            <td>
                                $${producto.precio.toLocaleString("es-CL")}
                            </td>

                            <td>
                                ${producto.stock}
                            </td>

                            <td>
                                ${producto.stockCritico}
                            </td>

                            <td>
                                ${producto.categoria}
                            </td>

                            <td>

                                <button
                                    type="button"
                                    onclick="
                                        editarProducto(
                                            '${producto.codigo}'
                                        )
                                    ">
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onclick="
                                        eliminarProducto(
                                            '${producto.codigo}'
                                        )
                                    ">
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}

// Elimina un producto.
function eliminarProducto(codigo) {

    const confirmar =
        confirm(
            "¿Quieres eliminar este producto?"
        );

    if (!confirmar) {
        return;
    }

    const productos =
        obtenerProductos().filter(
            producto =>
                producto.codigo !== codigo
        );

    guardarProductos(productos);

    renderAdminProductos();
}

// Guarda el código del producto que se quiere editar.
function editarProducto(codigo) {

    localStorage.setItem(
        "productoEditar",
        codigo
    );

    location.href =
        "producto-form.html";
}

// Formulario para crear o editar productos.
const formularioProducto =
    document.getElementById(
        "form-producto"
    );

if (formularioProducto) {

    formularioProducto.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const codigo =
                document
                    .getElementById("codigo")
                    .value
                    .trim();

            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();

            const descripcion =
                document
                    .getElementById("descripcion")
                    .value
                    .trim();

            const precio =
                Number(
                    document
                        .getElementById("precio")
                        .value
                );

            const stock =
                Number(
                    document
                        .getElementById("stock")
                        .value
                );

            const stockCritico =
                Number(
                    document
                        .getElementById("stockCritico")
                        .value
                );

            const categoria =
                document
                    .getElementById("categoria")
                    .value
                    .trim();

            if (
                !codigo ||
                !nombre ||
                !descripcion ||
                !categoria ||
                precio < 0 ||
                stock < 0 ||
                stockCritico < 0
            ) {

                alert(
                    "Completa correctamente todos los campos."
                );

                return;
            }

            let productos =
                obtenerProductos();

            const productoEditar =
                localStorage.getItem(
                    "productoEditar"
                );

            // Si existe un producto para editar,
            // actualizamos sus datos.
            if (productoEditar) {

                const indice =
                    productos.findIndex(
                        producto =>
                            producto.codigo ===
                            productoEditar
                    );

                if (indice === -1) {

                    alert(
                        "No se encontró el producto."
                    );

                    return;
                }

                productos[indice] = {

                    ...productos[indice],

                    codigo: codigo,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    stock: stock,
                    stockCritico: stockCritico,
                    categoria: categoria

                };

                localStorage.removeItem(
                    "productoEditar"
                );

            } else {

                // Evita códigos repetidos.
                const existe =
                    productos.some(
                        producto =>
                            producto.codigo ===
                            codigo
                    );

                if (existe) {

                    alert(
                        "El código del producto ya existe."
                    );

                    return;
                }

                productos.push({

                    codigo: codigo,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    stock: stock,
                    stockCritico: stockCritico,
                    categoria: categoria,

                    // Imagen que existe actualmente
                    // dentro del proyecto.
                    imagen:
                        "img/productos/martillo_img.jpg"

                });
            }

            guardarProductos(productos);

            alert(
                "Producto guardado correctamente."
            );

            location.href =
                "productos.html";
        }
    );
}

// Carga los datos del producto cuando se está editando.
document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAdminProductos();

        const codigoEditar =
            localStorage.getItem(
                "productoEditar"
            );

        if (!codigoEditar) {
            return;
        }

        const producto =
            obtenerProductos().find(
                elemento =>
                    elemento.codigo ===
                    codigoEditar
            );

        if (!producto) {
            return;
        }

        const campos = [
            "codigo",
            "nombre",
            "descripcion",
            "precio",
            "stock",
            "stockCritico",
            "categoria"
        ];

        campos.forEach(campo => {

            const elemento =
                document.getElementById(
                    campo
                );

            if (elemento) {

                elemento.value =
                    producto[campo];
            }
        });
    }
);