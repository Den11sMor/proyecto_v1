// Datos iniciales de los productos y funciones para trabajar con localStorage.

// Productos que se muestran al comenzar la tienda.
const productosIniciales = [
{codigo:"FER001",nombre:"Martillo Carpintero",descripcion:"Martillo de acero con mango ergonómico.",precio:8990,stock:15,stockCritico:5,categoria:"Herramientas",imagen:"img/productos/martillo_img.jpg"},
{codigo:"FER002",nombre:"Destornillador Phillips",descripcion:"Destornillador Phillips de alta resistencia.",precio:4990,stock:20,stockCritico:5,categoria:"Herramientas",imagen:"img/productos/destornillador_img.jpg"},
{codigo:"FER003",nombre:"Taladro Percutor",descripcion:"Taladro percutor eléctrico para trabajos domésticos.",precio:45990,stock:8,stockCritico:3,categoria:"Herramientas Eléctricas",imagen:"img/productos/taladro_img.jpg"},
{codigo:"FER004",nombre:"Caja de Tornillos",descripcion:"Caja con tornillos para madera.",precio:5990,stock:30,stockCritico:10,categoria:"Ferretería",imagen:"img/productos/tornillos_img.jpg"},
{codigo:"FER005",nombre:"Cinta Métrica",descripcion:"Cinta métrica de 5 metros.",precio:3990,stock:25,stockCritico:5,categoria:"Medición",imagen:"img/productos/cinta_img.jpg"}
];
function obtenerProductos() {
    const guardados=localStorage.getItem("productos");
    if (guardados) return JSON.parse(guardados);
    localStorage.setItem("productos",JSON.stringify(productosIniciales));
    return JSON.parse(JSON.stringify(productosIniciales));
}

function guardarProductos(lista) {localStorage.setItem("productos",JSON.stringify(lista))}
const productos = obtenerProductos();
