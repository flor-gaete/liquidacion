//config del fetch
let TotalDeLegajos = 0;
let username = 'sanabriaa';
let password = 'sanabriaa2020';
let url = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/7445ea46-42ff-49b8-9989-205870978022/children`;
let authString = `${username}:${password}`
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(authString));
//
var MetadatosDeLegajos = [];
let arrayDeLegajos;
let datosFinales;

// Cuando se carga la página se realiza la consulta de los legajos
window.addEventListener('load', async function (e) {
    console.log("click!")
    e.preventDefault()

    try {
        let dataUno = await fetch(url, { method: 'GET', headers });
        let jsonDataUno = await dataUno.json();
        console.log('Total legajos', jsonDataUno.list.pagination.totalItems);
        TotalDeLegajos = jsonDataUno.list.pagination.totalItems;
    } catch (error) {
        console.log('Error primer fetch: ', error);
    }

    //config del segundo fetch
    const urlDos = `${url}/?maxItems=${TotalDeLegajos}`

    try {
        // Se realiza la segunda consulta
        let dataDos = await fetch(urlDos, { method: 'GET', headers });
        let jsonDataDos = await dataDos.json();
        arrayDeLegajos = jsonDataDos.list.entries;
    } catch (error) {
        console.log('Error segundo fetch: ', error);
    }

    //  console.log(arrayDeLegajos);
    // Se recorren los nodos recibidos en formato array
    let indice = 0;
    arrayDeLegajos.forEach(async legajo => {

        // Url varia segun el id de cada legajo
        let urlLegajos = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/${legajo.entry.id}`;

        // Consulta por cada nodo
        let data = await fetch(urlLegajos, { method: 'GET', headers: headers })
        let jsonData = await data.json();
        // Se agregan los metadatos de cada nodo al array para disponerlos de forma global
        MetadatosDeLegajos.push(jsonData);
        jsonData = {};
        indice += 1;
<<<<<<< HEAD
        if (indice === arrayDeLegajos.length) {
            // console.log(MetadatosDeLegajos)
            // //await realizarCalculos(MetadatosDeLegajos);
            // console.error('MetadatosDeLegajos');
            // //Modificar en node, el límite de subida de archivo.
            // MetadatosDeLegajos.forEach( async legajo => {
            //     await fetch('http://localhost:4500/backup', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(legajo)
            //     });
            // });
            // console.log('Finalizado')
=======
        if(indice === arrayDeLegajos.length){
            const arrayDePruebas = [{
                name : "xxx",
                apellido : "zzzz"
            },
            {
                name : "dddd",
                apellido : "lafff"
            }]
            const objetoMetadata = {datos : arrayDePruebas}
            await fetch(`http://localhost:4500/backup`,{
                method: 'POST', 
                mode: "cors", 
                cache: "no-cache", 
                credentials: 'same-origin',
                body: JSON.stringify(objetoMetadata),
                //body: 'arrayDePruebas',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                })
>>>>>>> 12-11
        }
    });
});


<<<<<<< HEAD
=======

console.warn('MetadatosDeLegajos')
console.log(MetadatosDeLegajos)
//fetch(`http://localhost:4500/backup`,{method: 'POST'}, {body: MetadatosDeLegajos})
>>>>>>> 12-11


// Line
const graficoDeLinea = (cantPorFormacion) => {

    let [
        cantPrimario,
        cantSecundario,
        cantTerciario,
        cantUniversitarioC,
        cantUniversitarioI,
    ] = cantPorFormacion;

    let ctx = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Primario", "Secundario", "Terciario", "Universitario completo", "Universitario incompleto"],
            datasets: [{
                label: '# of Votes',
                data: [cantPrimario,
                    cantSecundario,
                    cantTerciario,
                    cantUniversitarioC,
                    cantUniversitarioI,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
} // Fin grafico de Linea

//pie
const graficoDeTorta = (cantPorFormacion) => {

    let [
        cantPrimario,
        cantSecundario,
        cantTerciario,
        cantUniversitarioC,
        cantUniversitarioI,
    ] = cantPorFormacion;

    let ctxP = document.getElementById("myChart").getContext('2d');
    let myChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: ["Primario", "Secundario", "Terciario", "Universitario completo", "Universitario incompleto"],
            datasets: [{
                data: [cantPrimario,
                    cantSecundario,
                    cantTerciario,
                    cantUniversitarioC,
                    cantUniversitarioI],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        },
        options: {
            responsive: true,
            legend: false,
            maintainAspectRatio: false
        }
    });
} // Fin grafico de Torta


//line
const graficoDeLineaDos = (cantPorFormacion) => {
    let [
        cantPrimario,
        cantSecundario,
        cantTerciario,
        cantUniversitarioC,
        cantUniversitarioI,
    ] = cantPorFormacion;

    var ctxL = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: ["Primario", "Secundario", "Terciario", "Universitario completo", "Universitario incompleto"],
            datasets: [{
                label: "Cantidades de Formación",
                backgroundColor: [
                    'rgba(105, 0, 132, .2)',
                ],
                borderColor: [
                    'rgba(200, 99, 132, .7)',
                ],
                borderWidth: 2,
                data: [cantPrimario,
                    cantSecundario,
                    cantTerciario,
                    cantUniversitarioC,
                    cantUniversitarioI]
            }, {
                label: "My Second dataset",
                backgroundColor: [
                    'rgba(0, 137, 132, .2)',
                ],
                borderColor: [
                    'rgba(0, 10, 130, .7)',
                ],
                data: [28, 48, 40, 19, 86, 27, 90]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
} // Fin grafico Linea Dos

//radar
const graficoDeRadar = (cantPorFormacion) => {
    let [
        cantPrimario,
        cantSecundario,
        cantTerciario,
        cantUniversitarioC,
        cantUniversitarioI,
    ] = cantPorFormacion;

    var ctxR = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctxR, {
        type: 'radar',
        data: {
            labels: ["Primario", "Secundario", "Terciario", "Universitario completo", "Universitario incompleto"],
            datasets: [{
                label: "My First dataset",
                data: [cantPrimario,
                    cantSecundario,
                    cantTerciario,
                    cantUniversitarioC,
                    cantUniversitarioI],
                backgroundColor: [
                    'rgba(105, 0, 132, .2)',
                ],
                borderColor: [
                    'rgba(200, 99, 132, .7)',
                ],
                borderWidth: 2
            }, {
                label: "My Second dataset",
                data: [28, 48, 40, 19, 96, 27, 100],
                backgroundColor: [
                    'rgba(0, 250, 220, .2)',
                ],
                borderColor: [
                    'rgba(0, 213, 132, .7)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
} // Fin grafico Radar

//doughnut
const graficoDeDona = (cantPorFormacion) => {
    let [
        cantPrimario,
        cantSecundario,
        cantTerciario,
        cantUniversitarioC,
        cantUniversitarioI,
    ] = cantPorFormacion;

    var ctxD = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: ["Primario", "Secundario", "Terciario", "Universitario completo", "Universitario incompleto"],
            datasets: [{
                data: [cantPrimario,
                    cantSecundario,
                    cantTerciario,
                    cantUniversitarioC,
                    cantUniversitarioI],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
} // Fin grafico Dona


// Variables para almacenar las cantidades por tipo de formacion
let cantPrimario = 0,
    cantSecundario = 0,
    cantTerciario = 0,
    cantUniversitarioC = 0,
    cantUniversitarioI = 0,
    cantSinFormacion = 0;

// Se muestran los gráficos
document.querySelector('#grafico-linea').addEventListener('click', function (e) {
    e.preventDefault();
    //document.getElementById('myChart').removeChild
    $('myChart').empty();

    let formacion = '';
    let indice = 0;
    MetadatosDeLegajos.forEach(legajos => {
        formacion = legajos.entry.properties['tc:formacion'];
        (formacion === 'Primario completo') ? cantPrimario++
            : (formacion === 'Secundario completo') ? cantSecundario++
                : (formacion === 'Terciario completo') ? cantTerciario++
                    : (formacion === 'Universitario completo') ? cantUniversitarioC++
                        : (formacion === 'Universitario incompleto') ? cantUniversitarioI
                            : cantSinFormacion;
        indice += 1;
        if (indice == MetadatosDeLegajos.length) {
            graficoDeLinea([
                cantPrimario,
                cantSecundario,
                cantTerciario,
                cantUniversitarioC,
                cantUniversitarioI,
                cantSinFormacion
            ])
        }
    });
});

document.querySelector('#grafico-torta').addEventListener('click', function (e) {
    e.preventDefault();
    //document.getElementById('myChart').innerText = '';
    $('myChart').empty();

    let formacion = '';
    let indice = 0;
    MetadatosDeLegajos.forEach(legajos => {
        formacion = legajos.entry.properties['tc:formacion'];
        (formacion === 'Primario completo') ? cantPrimario++
            : (formacion === 'Secundario completo') ? cantSecundario++
                : (formacion === 'Terciario completo') ? cantTerciario++
                    : (formacion === 'Universitario completo') ? cantUniversitarioC++
                        : (formacion === 'Universitario incompleto') ? cantUniversitarioI
                            : cantSinFormacion;
        indice += 1;
        if (indice == MetadatosDeLegajos.length) {
            graficoDeTorta([
                cantPrimario,
                cantSecundario,
                cantTerciario,
                cantUniversitarioC,
                cantUniversitarioI,
                cantSinFormacion
            ])
        }
    });
});

document.querySelector('#grafico-lineados').addEventListener('click', function (e) {
    e.preventDefault();
    //document.getElementById('myChart').innerText = '';
    $('myChart').empty();

    let formacion = '';
    let indice = 0;
    MetadatosDeLegajos.forEach(legajos => {
        formacion = legajos.entry.properties['tc:formacion'];
        (formacion === 'Primario completo') ? cantPrimario++
            : (formacion === 'Secundario completo') ? cantSecundario++
                : (formacion === 'Terciario completo') ? cantTerciario++
                    : (formacion === 'Universitario completo') ? cantUniversitarioC++
                        : (formacion === 'Universitario incompleto') ? cantUniversitarioI
                            : cantSinFormacion;
        indice += 1;
        if (indice == MetadatosDeLegajos.length) {
            graficoDeLineaDos([
                cantPrimario,
                cantSecundario,
                cantTerciario,
                cantUniversitarioC,
                cantUniversitarioI,
                cantSinFormacion
            ])
        }
    });
});

document.querySelector('#grafico-dona').addEventListener('click', function (e) {
    e.preventDefault();
    //document.getElementById('myChart').innerText = '';
    $('myChart').empty();

    let formacion = '';
    let indice = 0;
    MetadatosDeLegajos.forEach(legajos => {
        formacion = legajos.entry.properties['tc:formacion'];
        (formacion === 'Primario completo') ? cantPrimario++
            : (formacion === 'Secundario completo') ? cantSecundario++
                : (formacion === 'Terciario completo') ? cantTerciario++
                    : (formacion === 'Universitario completo') ? cantUniversitarioC++
                        : (formacion === 'Universitario incompleto') ? cantUniversitarioI
                            : cantSinFormacion;
        indice += 1;
        if (indice == MetadatosDeLegajos.length) {
            graficoDeDona([
                cantPrimario,
                cantSecundario,
                cantTerciario,
                cantUniversitarioC,
                cantUniversitarioI,
                cantSinFormacion
            ])
        }
    });
});

document.querySelector('#grafico-radar').addEventListener('click', function (e) {
    e.preventDefault();

    let formacion = '';
    let indice = 0;
    MetadatosDeLegajos.forEach(legajos => {
        formacion = legajos.entry.properties['tc:formacion'];
        (formacion === 'Primario completo') ? cantPrimario++
        : (formacion === 'Secundario completo') ? cantSecundario++
        : (formacion === 'Terciario completo') ? cantTerciario++
        : (formacion === 'Universitario completo') ? cantUniversitarioC++
        : (formacion === 'Universitario incompleto') ? cantUniversitarioI
        : cantSinFormacion;
        indice += 1;
        if (indice == MetadatosDeLegajos.length) {
            graficoDeRadar([
                cantPrimario,
                cantSecundario,
                cantTerciario,
                cantUniversitarioC,
                cantUniversitarioI,
                cantSinFormacion
            ])
        }
    });
});


// Varones y mujeres
// Cantidades y porcentajes
// Varones y mujeres por categorías
// Porcentajes y cantidades por categoría
// Porcentajes y cantidades por sector (sector o área)
// Porcentajes y cantidades por franja etárea (hasta 30, entre 30-40, 40-50, mayores de 60)
// antigüedad.js (Darío)

let
    cantMujeres = 0,
    cantVarones = 0,

    mujeresPorCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'W24': 0, 'W25': 0, 'W28': 0, 'undefined': 0 },
    varonesPorCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'W24': 0, 'W25': 0, 'W28': 0 },

    porcentajeMujeresCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'W24': 0, 'W25': 0, 'W28': 0 },
    porcentajeVaronesCategoria = { '21': 0, '22': 0, '23': 0, '24': 0, 'W24': 0, 'W25': 0, 'W28': 0 },

    mujeresPorSector = {},
    varonesPorSector = {},

    porcentajeMujeresSector = 0,
    porcentajeVaronesSector = 0;

let mujeresPorDependencia = {
    'HTC-Miembros': 0,
    'Presidencia': 0,
    'Vocalía A': 0,
    'Vocalía B': 0,
    'Vocalía C': 0,
    'Secretaría Administrativa': 0,
    'Prosecretaría Administrativa': 0,
    'Servicio Administrativo Financiero': 0,
    'Dirección de Asuntos Legales': 0,
    'Secretaría Técnica': 0,
    'Fiscalía General de Procesos': 0,
    'Control Fondos Federales': 0,
    'Control Sistémico': 0,
    'Supervisoría A': 0,
    'Supervisoría B': 0,
    'Supervisoría C': 0
}

let varonesPorDependencia = {
    'HTC-Miembros': 0,
    'Presidencia': 0,
    'Vocalía A': 0,
    'Vocalía B': 0,
    'Vocalía C': 0,
    'Secretaría Administrativa': 0,
    'Prosecretaría Administrativa': 0,
    'Servicio Administrativo Financiero': 0,
    'Dirección de Asuntos Legales': 0,
    'Secretaría Técnica': 0,
    'Fiscalía General de Procesos': 0,
    'Control Fondos Federales': 0,
    'Control Sistémico': 0,
    'Supervisoría A': 0,
    'Supervisoría B': 0,
    'Supervisoría C': 0
}

const categorias = [
    '21',
    '22',
    '23',
    '24',
    'B24',
    'W24',
    'W25',
    'W28'
]
const realizarCalculos = async (MetadatosDeLegajos) => {

    MetadatosDeLegajos.forEach(legajo => {
        // Cantidad total de mujeres y cantidad total de varones
        (legajo.entry.properties['tc:sexo'] === 'Mujer') ? cantMujeres++ : cantVarones++;

        // Cantidad de mujeres por categoría
        if (legajo.entry.properties['tc:sexo'] === 'Mujer') {
            switch (legajo.entry.properties['tc:categoria']) {
                case '21':
                    ++mujeresPorCategoria['21'];
                    break;
                case '22':
                    ++mujeresPorCategoria['22'];
                    break;
                case '23':
                    ++mujeresPorCategoria['23'];
                    break;
                case '24':
                    ++mujeresPorCategoria['24'];
                    break;
                case 'W24':
                    ++mujeresPorCategoria['W24'];
                    break;
                case 'W25':
                    ++mujeresPorCategoria['W25'];
                    break;
                case 'W28':
                    ++mujeresPorCategoria['W28'];
                    break;
                default:
                   ++mujeresPorCategoria['undefined'];
            }

            switch (legajo.entry.properties['tc:dependencia']){
                case 'HTC-Miembros':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Presidencia':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Vocalía A':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Vocalía B':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Vocalía C':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Secretaría Administrativa':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Prosecretaría Administrativa':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Servicio Administrativo Financiero':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Dirección de Asuntos Legales':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Secretaría Técnica':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Fiscalía General de Procesos':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Control Fondos Federales':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Control Sistémico':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Supervisoría A':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Supervisoría B':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                case 'Supervisoría C':
                    ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                    break;
                default:
                ++mujeresPorDependencia[legajo.entry.properties['tc:dependencia']];
                break;


            }

            // Se suma una mujer a la dependencia correspondiente
            // if(legajo.properties['tc:dependencia'] != undefined){
            //     ++mujeresPorDependencia[legajo.properties['tc:dependencia']];
            // };
        }

        // Cantidad de varones por categoría
        if (legajo.entry.properties['tc:sexo'] === 'Varón') {
            switch (legajo.entry.properties['tc:categoria']) {
                case '21':
                    ++varonesPorCategoria['21'];
                    break;
                case '22':
                    ++varonesPorCategoria['22'];
                    break;
                case '23':
                    ++varonesPorCategoria['23'];
                    break;
                case '24':
                    ++varonesPorCategoria['24'];
                    break;
                case 'W24':
                    ++varonesPorCategoria['W24'];
                    break;
                case 'W25':
                    ++varonesPorCategoria['W25'];
                    break;
                case 'W28':
                    ++varonesPorCategoria['W28'];
                    break;
                default:
                   ++varonesPorCategoria['undefined'];
            }

            // Se suma un varón a la dependencia correspondiente
            // if(legajo.properties['tc:dependencia'] !== undefined){
            //     ++varonesPorDependencia[legajo.properties['tc:dependencia']];
            // }
        }
    });

    console.log('Cantidad Mujeres: ', cantMujeres);
    console.log('Cantidad Mujeres: ', cantVarones);
    console.log('Cantidad de Mujeres por categoría')

}