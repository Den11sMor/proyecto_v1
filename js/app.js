// Función para corregir las rutas de las imágenes
// dependiendo de la carpeta donde se encuentra la página.

function rutaImagen(ruta) {

    if (!ruta) {
        return "";
    }

    // Si la ruta ya comienza con ../,
    // no se agrega nuevamente.
    if (ruta.startsWith("../")) {
        return ruta;
    }

    const rutaActual =
        window.location.pathname;

    // Las páginas dentro de pages necesitan
    // subir una carpeta para llegar a img.
    if (rutaActual.includes("/pages/")) {
        return "../" + ruta;
    }

    // Los archivos dentro de admin también
    // necesitan subir una carpeta.
    if (rutaActual.includes("/admin/")) {
        return "../" + ruta;
    }

    // index.html está en la carpeta principal.
    return ruta;
}