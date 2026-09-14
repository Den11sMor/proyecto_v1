// Funciones para administrar los usuarios
// desde el panel de administración.

function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuarios") || "[]"
    );
}

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}


// Muestra los usuarios registrados.
function mostrarUsuarios() {

    const contenedor =
        document.getElementById(
            "tabla-usuarios"
        );

    if (!contenedor) {
        return;
    }

    const usuarios =
        obtenerUsuarios();

    if (usuarios.length === 0) {

        contenedor.innerHTML = `
            <p>
                No existen usuarios registrados.
            </p>
        `;

        return;
    }

    contenedor.innerHTML = `

        <div class="table-wrap">

            <table>

                <thead>

                    <tr>

                        <th>RUN</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    ${usuarios.map(usuario => `

                        <tr>

                            <td>
                                ${usuario.run}
                            </td>

                            <td>
                                ${usuario.nombre}
                                ${usuario.apellidos}
                            </td>

                            <td>
                                ${usuario.correo}
                            </td>

                            <td>
                                ${usuario.rol}
                            </td>

                            <td>
                                ${
                                    usuario.activo === false
                                        ? "Inactivo"
                                        : "Activo"
                                }
                            </td>

                            <td>

                                <button
                                    type="button"
                                    onclick="
                                        cambiarEstado(
                                            '${usuario.run}'
                                        )
                                    ">
                                    Cambiar estado
                                </button>

                                <button
                                    type="button"
                                    onclick="
                                        eliminarUsuario(
                                            '${usuario.run}'
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


// Cambia el estado del usuario.
function cambiarEstado(run) {

    const usuarios =
        obtenerUsuarios();

    const usuario =
        usuarios.find(
            elemento =>
                elemento.run === run
        );

    if (!usuario) {
        return;
    }

    usuario.activo =
        usuario.activo === false;

    guardarUsuarios(usuarios);

    mostrarUsuarios();
}


// Elimina un usuario.
function eliminarUsuario(run) {

    const confirmar =
        confirm(
            "¿Quieres eliminar este usuario?"
        );

    if (!confirmar) {
        return;
    }

    const usuarios =
        obtenerUsuarios().filter(
            usuario =>
                usuario.run !== run
        );

    guardarUsuarios(usuarios);

    mostrarUsuarios();
}


// Crea un nuevo usuario desde administración.
const formularioUsuario =
    document.getElementById(
        "form-usuario"
    );

if (formularioUsuario) {

    formularioUsuario.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const run =
                document
                    .getElementById("run")
                    .value
                    .trim()
                    .toUpperCase();

            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();

            const apellidos =
                document
                    .getElementById("apellidos")
                    .value
                    .trim();

            const correo =
                document
                    .getElementById("correo")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("password")
                    .value;

            const rol =
                document
                    .getElementById("rol")
                    .value;


            if (
                !run ||
                !nombre ||
                !apellidos ||
                !correo ||
                !password ||
                !rol
            ) {

                alert(
                    "Completa todos los campos."
                );

                return;
            }


            const usuarios =
                obtenerUsuarios();

            const existe =
                usuarios.some(
                    usuario =>
                        usuario.run === run ||
                        usuario.correo === correo
                );

            if (existe) {

                alert(
                    "El RUN o correo ya está registrado."
                );

                return;
            }


            usuarios.push({

                run: run,
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                password: password,
                rol: rol,
                activo: true,
                direccion: "",
                region: "",
                comuna: ""

            });


            guardarUsuarios(usuarios);

            alert(
                "Usuario creado correctamente."
            );

            window.location.href =
                "usuarios.html";
        }
    );
}


// Carga los usuarios al abrir la página.
document.addEventListener(
    "DOMContentLoaded",
    () => {

        mostrarUsuarios();

    }
);