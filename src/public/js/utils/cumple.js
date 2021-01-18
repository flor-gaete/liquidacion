//paso1 hacer un fetch al nodo padre, recorriendo todos los legajos.
//como resultado se genera un listado de objetos que trae los nodos hijos.
//necesito hacer un fetch


let contador = 0
let arrayDepdf = []
arrayDepdf.push([ 'Personas que cumplen años este mes', '*******', '*******' ])
arrayDepdf.push([ 'Nombre y Apellido', 'Fecha de nacimiento', 'Edad actual' ])
let TotalDeLegajos;
let username = 'sanabriaa';
let password = 'sanabriaa2020'; 
const url = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/7445ea46-42ff-49b8-9989-205870978022/children`;
const urlSimple = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/`
//config del fetch
const authString = `${username}:${password}`
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(authString))
//
//configuraciones propias del informe cumpleaños
const mesActual = new Date().getMonth() 
let arrayDeCumpleAnieros = []
let arrayDeFormacion = []
//console.log(mesActual);
let respuesta = document.getElementById('tabla-cumple')


//
window.addEventListener("load", () => {
    fetch(url,{method: 'GET', headers: headers})
    .then(async function (response) {
        let data = response;
        let jsonData = await data.json();
        TotalDeLegajos = jsonData.list.pagination.totalItems
        //seteamos la url y le agregaas el maximo de items en la query
        var urlDos = `${url}/?maxItems=${TotalDeLegajos}`//
        fetch(urlDos,{method: 'GET', headers: headers})
        .then(async (response) => {
            let data = response;
            let jsonData = await data.json();
            //console.log(jsonData.entry.properties['tc:cuilok'])
            //console.log(jsonData.list.entries)
            const arrayDeLegajos = jsonData.list.entries
            arrayDeLegajos.forEach( legajo => {
                //console.log(legajo.entry.id, legajo.entry.name) //93bcf766-2566-43c2-9989-bdb6ec4cafc7 TERAN-LUIS-OSVALDO
                const urlIndividual = urlSimple + legajo.entry.id
                fetch(urlIndividual,{method: 'GET', headers: headers})
                .then(async (response) => {
                    let data = response
                    let jsonData = await data.json();
                    let fechaNacLocal = new Date(jsonData.entry.properties['tc:fechanacimiento']).toLocaleDateString()
                    let mesDeCumpleDeLaPersona = new Date(jsonData.entry.properties['tc:fechanacimiento']).getMonth()
                    //console.log(jsonData.entry.name, fechaNacLocal, jsonData.entry.properties['tc:edad'] );
                    //console.log('aca tiene que venir un dato de legajo, PONELE');
                    let EdadActual = jsonData.entry.properties['tc:edad']
                    contador = contador + 1
                    if(mesActual === mesDeCumpleDeLaPersona){
                        //console.log('esta persona cumple este mes>' + ' ' + jsonData.entry.name + ' ' + fechaNacLocal);
                        //arrayDeFormacion.push({formacion : jsonData.entry.properties['tc:formacion']})
                        let nyaSinEspacios = jsonData.entry.properties['tc:apellido-y-nombre'].replace("-"," ")
                        //arrayDeFormacion.push(jsonData.entry.properties['tc:formacion'])
                        arrayDeCumpleAnieros.push({name : nyaSinEspacios, fechaNac : fechaNacLocal,  Edad: EdadActual })
                        //console.log(arrayDeCumpleAnieros[0]);
                        
                        //
                        /* respuesta.innerHTML += `
                        <tr >
                        <td>${nyaSinEspacios}</td>
                        <td>${fechaNacLocal}</td>
                        <td>${EdadActual}</td>
                        </tr>
                    ` */
                        
                    }
                })
            })
            console.info('fijate pue si ya se termino el foreach, hace na el favor');
            console.log(arrayDeLegajos.length);
            
        })
        .finally(() => {
            arrayDeCumpleAnieros.sort()          
        })
    })   
})


/* setTimeout(() =>  {
    arrayDeFormacion.forEach(formacion => {
        console.log(formacion);
    });
}, 4000) */
//
//{arrayDeCumpleAnieros  ? console.log(arrayDeCumpleAnieros) : null}
//

/////////////////

//script de creacion del pdf


var myInterval = setInterval(show, 3000)
function show()  {
    if(contador == 232 ){
        stop()
        arrayDeCumpleAnieros.sort()
        console.log(contador);
        console.info('se ha alcanzdo el final')
        console.info(arrayDeCumpleAnieros)
        arrayDeCumpleAnieros.forEach((persona) => {
            respuesta.innerHTML += `
                        <tr >
                        <td>${persona.name}</td>
                        <td>${persona.fechaNac}</td>
                        <td>${persona.Edad}</td>
                        </tr>
                    `
        })
        document.getElementById("descargarpdf").disabled = false;
        document.getElementById("descargarpdf").innerText = 'Descargar el informe en formato PDF';
        
    }
}
function stop(){
    clearInterval(myInterval)
}

function descargarpdf(){
    //
    console.log('ejecuta');
    //
    arrayDeCumpleAnieros.sort()
    //console.log(arrayDeCumpleAnieros);
    arrayDeCumpleAnieros.forEach(objeto => {
        //
        const datoX = Object.values(objeto)
        //console.log(typeof datoX);
        //console.log(datoX);
        arrayDepdf.push(datoX)
        
    });
    //
    console.log(arrayDepdf);
    var docDefinition = {
        content: [
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 2,
              widths: [ 'auto', 'auto', 'auto' ],
      
              //body: megaArrays
              body: arrayDepdf
            }
          }
        ]
      };
    pdfMake.createPdf(docDefinition).download()
}

