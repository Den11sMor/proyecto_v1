// Funciones de validación usadas en los formularios.

function validarCorreo(correo) {
    const v=correo.trim().toLowerCase();
    return v.length>0&&v.length<=100&&["@duoc.cl","@profesor.duoc.cl","@gmail.com"].some(d=>v.endsWith(d));
}

function validarPassword(password) {return password.length>=4&&password.length<=10}

function validarRUN(run) {
    let v=run.trim().toUpperCase().replace(/[\s.-]/g,"");
    if (!/^\d{7,8}[0-9K]$/.test(v))return false;
    const cuerpo=v.slice(0,-1),dv=v.slice(-1);let suma=0,m=2;
    for (let i=cuerpo.length-1;i>=0;i--) {suma+=Number(cuerpo[i])*m;m=m===7?2:m+1}
    const r=11-(suma%11),esperado=r===11?"0":r===10?"K":String(r);
    return dv===esperado;
}
