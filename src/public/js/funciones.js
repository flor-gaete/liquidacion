import { graficoBarraV, graficoPie } from './graficas.js';
let MetadatosDeLegajos;
let cantMujeres = 0,
    cantVarones = 0,
    mujeres20a30 = 0,
    varones20a30 = 0,
    mujeres30a40 = 0,
    varones30a40 = 0,
    mujeres40a50 = 0,
    varones40a50 = 0,
    mujeresMasDe50 = 0,
    varonesMasDe50 = 0,

    mujeresPorFormacion = {
        'Primario completo': 0,
        'Secundario incompleto': 0,
        'Secundario completo': 0,
        'Terciario completo': 0,
        'Universitario incompleto': 0,
        'Universitario completo': 0
    }

varonesPorFormacion = {
    'Primario completo': 0,
    'Secundario incompleto': 0,
    'Secundario completo': 0,
    'Terciario completo': 0,
    'Universitario incompleto': 0,
    'Universitario completo': 0
}

mujeresPorCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'B24': 0, 'W24': 0, 'W25': 0, 'W28': 0, 'undefined': 0 },
    varonesPorCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'B24': 0, 'W24': 0, 'W25': 0, 'W28': 0, 'undefined': 0 },
    porcentajeMujeresCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'B24': 0, 'W24': 0, 'W25': 0, 'W28': 0 },
    porcentajeVaronesCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'B24': 0, 'W24': 0, 'W25': 0, 'W28': 0 },

    mujeresPorSector = { 'Administrativo': 0, 'Técnico': 0, 'Profesional': 0, 'Maestranza': 0 },
    varonesPorSector = { 'Administrativo': 0, 'Técnico': 0, 'Profesional': 0, 'Maestranza': 0 },

    porcentajeMujeresSector = { 'Administrativo': 0, 'Técnico': 0, 'Profesional': 0, 'Maestranza': 0, 'undefined': 0 },
    porcentajeVaronesSector = { 'Administrativo': 0, 'Técnico': 0, 'Profesional': 0, 'Maestranza': 0, 'undefined': 0 };

let mujeresPorDependencia = {
    'HTC-Miembros': 0,
    'Presidencia': 0,
    'Vocalía "A"': 0,
    'Vocalía "B"': 0,
    'Secretaría Administrativa': 0,
    'Prosecretaría Administrativa': 0,
    'Servicio Administrativo Financiero': 0,
    'Dirección de Asuntos Legales': 0,
    'Secretaría Técnica': 0,
    'Prosecretaría Técnica': 0,
    'Fiscalía Gral. de Procesos': 0,
    'Control Fondos Federales': 0,
    'Control Sistémico': 0,
    'Supervisoría "A"': 0,
    'Supervisoría "B"': 0,
    'Supervisoría "C"': 0,
};

let varonesPorDependencia = {
    'HTC-Miembros': 0,
    'Presidencia': 0,
    'Vocalía "A"': 0,
    'Vocalía "B"': 0,
    'Secretaría Administrativa': 0,
    'Prosecretaría Administrativa': 0,
    'Servicio Administrativo Financiero': 0,
    'Dirección de Asuntos Legales': 0,
    'Secretaría Técnica': 0,
    'Prosecretaría Técnica': 0,
    'Fiscalía Gral. de Procesos': 0,
    'Control Fondos Federales': 0,
    'Control Sistémico': 0,
    'Supervisoría "A"': 0,
    'Supervisoría "B"': 0,
    'Supervisoría "C"': 0,
};

// Mujeres
function cantMujeresFormacion(legajo) {
    let formacion = legajo.entry.properties['tc:formacion'];
    ++mujeresPorFormacion[formacion];
    return mujeresPorFormacion;
};

function cantMujeresDependencia(legajo) {
    let dependencia = legajo.entry.properties['tc:dependencia'];
    ++mujeresPorDependencia[dependencia];
    return mujeresPorDependencia;
};

function cantMujeresSector(legajo) {
    let sector = legajo.entry.properties['tc:sector'];
    ++mujeresPorSector[sector];
    return mujeresPorSector;
};

// Varones
function cantVaronesFormacion(legajo) {
    let formacion = legajo.entry.properties['tc:formacion'];
    ++mujeresPorFormacion[formacion];
    return mujeresPorFormacion;
};

function cantVaronesDependencia(legajo) {
    let dependencia = legajo.entry.properties['tc:dependencia'];
    ++mujeresPorDependencia[dependencia];
    return mujeresPorDependencia;
};

function cantVaronesSector(legajo) {
    let sector = legajo.entry.properties['tc:sector'];
    ++varonesPorSector[sector];
    return varonesPorSector;
};

// Varones y Mujeres
function cantMujeresVarones(legajo) {
    (legajo.entry.properties['tc:sexo'] === 'Mujer') ? ++cantMujeres :
        (legajo.entry.properties['tc:sexo'] === 'Varón') ? ++cantVarones :
            legajosIncompletos.push(legajo.entry.id);

    return [cantMujeres, cantVarones];
};

// Cantidad de mujeres y mujeres por franja etárea
function mujeresPorEdad(legajo) {
    (edad >= 20 && edad <= 30) ? ++mujeres20a30 :
        (edad >= 31 && edad <= 40) ? ++mujeres30a40 :
            (edad >= 41 && edad <= 50) ? ++mujeres40a50 :
                ++mujeresMasDe50;
}

function varonesPorEdad(legajo) {
    (edad >= 20 && edad <= 30) ? ++varones20a30 :
        (edad >= 31 && edad <= 40) ? ++varones30a40 :
            (edad >= 41 && edad <= 50) ? ++varones40a50 :
                ++varonesMasDe50;
}


function sumarObj(objeto){
    let total = 0;
    Object.values(objeto).forEach( e => { total += e });
    return total;
}

function porcentajeSector(){
    let total = 0;
    Object.values(objeto)
}









let legajosIncompletos = [];
const realizarCalculos = async (MetadatosDeLegajos) => {

    // MetadatosDeLegajos.forEach(legajo => {
        // Cantidad total de mujeres y cantidad total de varones
        // (legajo.entry.properties['tc:sexo'] === 'Mujer') ? ++cantMujeres :
        //     (legajo.entry.properties['tc:sexo'] === 'Varón') ? ++cantVarones :
        //         legajosIncompletos.push(legajo.entry.id);

        // Cantidad de mujeres por categoría y cantidad por dependencia
        // if (legajo.entry.properties['tc:sexo'] === 'Mujer') {
        //     let categoria = legajo.entry.properties['tc:categoria'];
        //     let sector = legajo.entry.properties['tc:sector'];
        //     let dependencia = legajo.entry.properties['tc:dependencia'];
        //     let edad = legajo.entry.properties['tc:edad'];

        //     ++mujeresPorCategoria[categoria];
        //     ++mujeresPorDependencia[dependencia];
        //     ++mujeresPorSector[sector];

        //     // Cantidad de mujeres y mujeres por franja etárea
        //     if (edad) {
        //         (edad >= 20 && edad <= 30) ? ++mujeres20a30 :
        //             (edad >= 31 && edad <= 40) ? ++mujeres30a40 :
        //                 (edad >= 41 && edad <= 50) ? ++mujeres40a50 :
        //                     ++mujeresMasDe50;
        //     }
        // }

        // Cantidad de varones por categoría y cantidad por dependencia
        // if (legajo.entry.properties['tc:sexo'] === 'Varón') {
        //     let categoria = legajo.entry.properties['tc:categoria'];
        //     let dependencia = legajo.entry.properties['tc:dependencia'];
        //     let sector = legajo.entry.properties['tc:sector'];
        //     let edad = legajo.entry.properties['tc:edad'];

        //     ++varonesPorCategoria[categoria];
        //     ++varonesPorDependencia[dependencia];
        //     ++varonesPorSector[sector];

        //     // Cantidad de varones por franja etárea
        //     if (edad) {
        //         (edad >= 20 && edad <= 30) ? ++varones20a30 :
        //             (edad >= 31 && edad <= 40) ? ++varones30a40 :
        //                 (edad >= 41 && edad <= 50) ? ++varones40a50 :
        //                     ++varonesMasDe50;
        //     }
        // }


    // });
}

// Se obtienen los datos de MongoDB
const obtenerDatos = async () => {
    let legajos = await fetch('http://localhost:4500/estadisticas-personal', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let legajosJson = await legajos.json();
    MetadatosDeLegajos = legajosJson;
    console.log(MetadatosDeLegajos);

    realizarCalculos(MetadatosDeLegajos);

    return true;
};

// Al cargarse la página
window.addEventListener('load', obtenerDatos);

