// Funciones generales del sitio, como usuario actual y rutas de imágenes.

function usuarioActual() {
    return JSON.parse(localStorage.getItem("usuarioActual") || "null");
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "../index.html";
}

function rutaImagen(ruta) {
    if (window.location.pathname.includes("/pages/") || window.location.pathname.includes("/admin/")) {
        return "../" + ruta;
    }
return ruta;
}
