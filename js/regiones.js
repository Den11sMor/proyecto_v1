// Datos de regiones y comunas para el formulario de usuario.

const regiones=[
{nombre:"Arica y Parinacota",comunas:["Arica","Camarones","Putre","General Lagos"]},
{nombre:"Tarapacá",comunas:["Iquique","Alto Hospicio","Pozo Almonte","Pica"]},
{nombre:"Antofagasta",comunas:["Antofagasta","Calama","Mejillones","Taltal"]},
{nombre:"Atacama",comunas:["Copiapó","Caldera","Vallenar","Chañaral"]},
{nombre:"Coquimbo",comunas:["La Serena","Coquimbo","Ovalle","Illapel"]},
{nombre:"Valparaíso",comunas:["Valparaíso","Viña del Mar","Quilpué","Villa Alemana"]},
{nombre:"Metropolitana de Santiago",comunas:["Santiago","Maipú","Puente Alto","Las Condes","La Florida","Renca"]},
{nombre:"O'Higgins",comunas:["Rancagua","San Fernando","Rengo","Machalí"]},
{nombre:"Maule",comunas:["Talca","Curicó","Linares","Constitución"]},
{nombre:"Ñuble",comunas:["Chillán","San Carlos","Bulnes","Quirihue"]},
{nombre:"Biobío",comunas:["Concepción","Talcahuano","Los Ángeles","Coronel"]},
{nombre:"La Araucanía",comunas:["Temuco","Angol","Villarrica","Pucón"]},
{nombre:"Los Ríos",comunas:["Valdivia","La Unión","Río Bueno","Panguipulli"]},
{nombre:"Los Lagos",comunas:["Puerto Montt","Osorno","Castro","Ancud"]},
{nombre:"Aysén",comunas:["Coyhaique","Aysén","Chile Chico","Cochrane"]},
{nombre:"Magallanes y Antártica Chilena",comunas:["Punta Arenas","Puerto Natales","Porvenir","Cabo de Hornos"]}
];
function cargarRegiones() {
    const s=document.getElementById("region");if (!s)return;
    regiones.forEach(r=>{const o=document.createElement("option");o.value=r.nombre;o.textContent=r.nombre;s.appendChild(o)})
}

function cargarComunas() {
    const s=document.getElementById("region"),c=document.getElementById("comuna");if (!s||!c)return;
    c.innerHTML='<option value="">Seleccione comuna</option>';
    const r=regiones.find(x=>x.nombre===s.value);if (!r)return;
    r.comunas.forEach(nombre=>{const o=document.createElement("option");o.value=nombre;o.textContent=nombre;c.appendChild(o)})
}
document.addEventListener("DOMContentLoaded",cargarRegiones)
