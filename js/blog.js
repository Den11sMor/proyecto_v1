// Contiene la información de los blogs y su visualización.

const blogs=[
{id:1,titulo:"Cómo elegir las herramientas correctas",descripcion:"Consejos para escoger las herramientas adecuadas.",contenido:"Elegir una buena herramienta es fundamental para obtener buenos resultados. Antes de comprar debemos considerar el tipo de trabajo, frecuencia de uso y calidad del producto.",imagen:"img/blog/herramientas_img.jpg"},
{id:2,titulo:"Consejos para mejorar tu hogar",descripcion:"Ideas simples para realizar proyectos en casa.",contenido:"Realizar pequeños proyectos de reparación puede mejorar considerablemente nuestro hogar. Siempre debemos utilizar las herramientas adecuadas y trabajar respetando las medidas de seguridad.",imagen:"img/blog/hogar_img.jpg"}
];
function mostrarBlogs() {
    const c=document.getElementById("lista-blogs");if (!c)return;c.innerHTML="";
    blogs.forEach(b=>{const a=document.createElement("article");a.className="producto-card";a.innerHTML=`<img src="${rutaImagen(b.imagen)}" alt="${b.titulo}"><h2>${b.titulo}</h2><p>${b.descripcion}</p><button onclick="verBlog(${b.id})">Leer más</button>`;c.appendChild(a)})
}

function verBlog(id) {localStorage.setItem("blogSeleccionado",id);location.href="blog-detalle.html"}
document.addEventListener("DOMContentLoaded",mostrarBlogs)
