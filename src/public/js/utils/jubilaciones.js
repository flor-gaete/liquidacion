//paso1 hacer un fetch al nodo padre, recorriendo todos los legajos.
//como resultado se genera un listado de objetos que trae los nodos hijos.
//necesito hacer un fetch
let arrayDeJubilaciones = []
let contador = 0
let arrayDepdf = []
arrayDepdf.push([ ' ----- ', ' Agentes en ', ' condiciones  ' , '  de jubilarse   ' , ' jubilarse ', ' -----   ' ])
arrayDepdf.push([ 'Nombre y Apellido', 'CUIL', 'Año de ingreso', 'Antigüedad', 'Fecha de Jubilacion', 'Estado' ])
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
//configuraciones propias del informe antiguedades
const mesActual = new Date().getMonth() 
let arrayDeCumpleAnieros = []
let arrayDeFormacion = []
//console.log(mesActual);
let respuesta = document.getElementById('tabla-jubilaciones')


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
            const arrayDeLegajos = jsonData.list.entries
            arrayDeLegajos.forEach( legajo => {
                //console.log(legajo.entry.id, legajo.entry.name) //93bcf766-2566-43c2-9989-bdb6ec4cafc7 TERAN-LUIS-OSVALDO
                const urlIndividual = urlSimple + legajo.entry.id
                fetch(urlIndividual,{method: 'GET', headers: headers})
                .then(async (response) => {
                    let data = response
                    let jsonData = await data.json();
                    /* let anioIngreso = new Date(jsonData.entry.properties['tc:fechaingreso']).toLocaleDateString()
                    anioIngreso = anioIngreso.getFullYear()
                    var seJubilaEn = jubilacion(jsonData.entry.properties["tc:edad"], anioIngreso, jsonData.entry.properties["tc:sexo"]) */
                    //let mesDeCumpleDeLaPersona = new Date(jsonData.entry.properties['tc:fechanacimiento']).getMonth()
                    //console.log(jsonData.entry.name, fechaNacLocal, jsonData.entry.properties['tc:edad'] );
                    //console.log('aca tiene que venir un dato de legajo, PONELE');
                    contador = contador + 1
                    if (
                        jsonData.entry.properties["tc:sexo"] == 'Varón' &&
                        jsonData.entry.properties["tc:antiguedad"] >= 30 &&
                        jsonData.entry.properties["tc:edad"] >= 63 ||

                        jsonData.entry.properties["tc:sexo"] == 'Mujer' &&
                        jsonData.entry.properties["tc:antiguedad"] >= 30 &&
                        jsonData.entry.properties["tc:edad"] >= 60
                    ){
                        let anioIngreso = new Date(jsonData.entry.properties['tc:fechaingreso']).getFullYear()
                        //anioIngreso = anioIngreso.getFullYear()
                        //var seJubilaEn = jubilacion(EdadActual, anioIngreso, jsonData.entry.properties["tc:sexo"])
                        let seJubilaEn = new Date(jsonData.entry.properties['tc:fecha-jubilacion']).toLocaleDateString()
                        let nyaSinEspacios = jsonData.entry.properties['tc:apellido-y-nombre'].replace("-"," ")
                        let estadoActual = jsonData.entry.properties['tc:estatus']
                        if(estadoActual != 'Jubilado/a'){
                            if(jsonData.entry.properties['tc:cuilok'] === undefined){
                                var cuilFinal = 'no esta cargado'
                            }else{
                                var cuilFinal = jsonData.entry.properties['tc:cuilok']
                            }
                            if (estadoActual === undefined) {
                                estadoActual = 'no esta cargado'
                            }
                            arrayDeJubilaciones.push({name : nyaSinEspacios, cuil : cuilFinal, ingreso : anioIngreso, antig : jsonData.entry.properties['tc:antiguedad'], jubil : seJubilaEn, estatus : estadoActual })
                        }
                    //     respuesta.innerHTML += `
                    //     <tr>
                    //     <td>${nyaSinEspacios}</td>
                    //     <td>${jsonData.entry.properties['tc:cuilok']}</td>
                    //     <td>${anioIngreso}</td>
                    //     <td>${jsonData.entry.properties["tc:antiguedad"]}</td>
                    //     <td>${seJubilaEn}</td>
                    //     </tr>
                    // `
                    }
                })
            })
        })
        .finally(() => {
            arrayDeJubilaciones.sort()
            //console.log(arrayDeCumpleAnieros);
            //console.log(arrayDeFormacion);
            //arrayDeFormacion.filter(formacion => formacion === 'Universitario completo');
            //console.log(arrayDeFormacion[0]);
        })
    })   
})


var myInterval = setInterval(show, 3000)
function show()  {
    if(contador == 232 ){
        stop()
        arrayDeJubilaciones.sort()
        console.log(contador);
        console.info('se ha alcanzdo el final')
        console.info(arrayDeJubilaciones)
        arrayDeJubilaciones.forEach((persona) => {
            respuesta.innerHTML += `
                        <tr >
                        <td>${persona.name}</td>
                        <td>${persona.cuil}</td>
                        <td>${persona.ingreso}</td>
                        <td>${persona.antig}</td>
                        <td>${persona.jubil}</td>
                        <td>${persona.estatus}</td>                     
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
    arrayDeJubilaciones.sort()
    //console.log(arrayDeJubilaciones);
    arrayDeJubilaciones.forEach(objeto => {
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
              widths: [ 'auto', 'auto', 'auto', 'auto',  'auto', 'auto'],
      
              //body: megaArrays
              body: arrayDepdf
            }
          }
        ]
      };
    pdfMake.createPdf(docDefinition).download()
}




//funcion que calcula cuando se va a jubilar
//function jubilacion(edad,ingreso,sexo){
    //ingreso = new Date(ingreso);
    //ingreso = ingreso.getFullYear();
    //var aniojub = ingreso + 30;
    //let anioActual = 2020
    //var  anioActual = new Date().getFullYear();
    //var difdeaniosdesdeelingreso = anioActual - ingreso;
    //var edadAlIngresar = edad - difdeaniosdesdeelingreso;
    //console.log('cuando ingreso tenia : ' + edadAlIngresar + ' años');
    //console.log('ingreso en el año: ' + ingreso);
    //var edadAltermino = edadAlIngresar + 30;
    //preguntamos si es mas o fem 
    //if (sexo == 'Varón') {
       //if (edadAltermino >= 63) {
          //console.log('se jub al cumplir 30 de serv. en el anio ' + aniojub);
          //return aniojub;
       //}else{
    
          //console.log('se necesitan mas años de serv. ' + edadAltermino + ' años va a tener ese entonces ' + aniojub );
          //aniojub +=  63 - edadAltermino;
          //console.log('año real de jub: es ' + aniojub);
          //return aniojub;
       //}
    //}else {
       //if (sexo == 'Mujer') {
          //{
             //if (edadAltermino >= 60) {
                //console.log('se jub al cumplir 30 de serv. en el anio ' + aniojub);
                //return aniojub;
             //}else{
          
                //console.log('se necesitan mas años de serv. ' + edadAltermino + ' años va a tener ese entonces ' + aniojub );
                //aniojub +=  60 - edadAltermino;
                //console.log('año real de jub: es ' + aniojub);
                //return aniojub;
             //}
          //}
       //}
    //}
 //}