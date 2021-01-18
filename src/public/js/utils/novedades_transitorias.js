//como resultado se genera un listado de objetos que trae los nodos hijos.
//necesito hacer un fetch
//let TotalDeLegajos = 0;
var username = "sanabriaa";
var password = "sanabriaa2020";
var url = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/7445ea46-42ff-49b8-9989-205870978022/children`;
var urlSimple = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/`;
//config del fetch
const authString = `${username}:${password}`;
let headers = new Headers();
headers.set("Authorization", "Basic " + btoa(authString));
//
//configuraciones propias del informe antiguedades
const mesActual = new Date().getMonth();
let arrayDeFaltas = [];
let arrayDeFaltasSuperFinal = [];
let arrayDeCumpleAnieros = [];
let arrayDeFormacion = [];
let arrayDeLegajosFinal = [];
let contadorDeItemsArray = 0;
var arrayDeNames = [];
var fichaDeAgenteDatos = [];
let arrayDepdf = [];
arrayDepdf.push(["DATOS DEL AGENTE ", "*******"]);
arrayDepdf.push(["Clave", "Valor"]);
//console.log(mesActual);
let respuesta = document.getElementById("tabla-totaldeagentes");
let datoModalAgente = document.getElementById("datos-agente");

//
window.addEventListener("load", () => {
  fetch(url, { method: "GET", headers: headers })
  .then(async function (response) {
    let data = response;
    let jsonData = await data.json();
    TotalDeLegajos = jsonData.list.pagination.totalItems;
    //seteamos la url y le agregaas el maximo de items en la query
    var urlDos = `${url}/?maxItems=${TotalDeLegajos}`; //
    //var urlFiltro = `${url}/?where=(name%10MATCHES%10'ACOSTA')`;
    fetch(urlDos, { method: "GET", headers: headers })
      .then(async (response) => {
        let data = response;
        let jsonData = await data.json();
        console.log(jsonData.list);
        const arrayDeLegajos = jsonData.list.entries;
        //arrayDeLegajos.sort()
        arrayDeLegajos.forEach((legajo) => {
          arrayDeLegajosFinal.push({
            name: legajo.entry.name,
            id: legajo.entry.id,
          });
        }); //aca tengo que meter ya sea un filtro de objeto o un filtro de array
        //ordemos el array final
        arrayDeLegajosFinal.sort();
        console.log(arrayDeLegajosFinal);
        arrayDeLegajosFinal.forEach((legajo) => {
          arrayDeNames.push(legajo.name + legajo.id);
          let nyaSinEspacios = legajo.name.replaceAll("-", " ");
          let legajoId = legajo.id;
          /* <td>${legajoId}</td>  */
          respuesta.innerHTML += `
                            <tr>
                                <td>${nyaSinEspacios}</td> 
                                
                                <td> <button type="button" class="btn btn-primary btn-sm"  data-mdb-toggle="tooltip" title="Ver" data-toggle="modal" data-target="#modalLRFormDemo" id="${legajoId}" onclick="datosAgente(event)"><i class="fas fa-eye" style="font-size: 14px;"></i></button></td>
                            </tr>
                            `;
        });
      })
      .finally(() => {
        //aca se ejecuta cualquier cosa que sucede al completarse la promise
      });
  });
});

function datosAgente(event) {
  console.log(event.target.id);
  //console.log("ejecuta");
  const id = event.target.id;
  const urlIndividual = urlSimple + id;
  fetch(urlIndividual, { method: "GET", headers: headers }).then(
    async (response) => {
      let data = response;
      let jsonData = await data.json();
      console.table(jsonData.entry.properties);
      //console.log(Object.keys(jsonData.entry.properties));
      //console.log(Object.values(jsonData.entry.properties));
      fichaDeAgenteDatos = jsonData.entry.properties;
      /* console.log(typeof jsonData.entry.properties);
      console.log(fichaDeAgenteDatos); */
      //var fichaDeAgenteKeys = Object.keys(jsonData.entry.properties);
      //let map = new Map(Object.entries(fichaDeAgenteDatos));
      let entradas = Object.entries(fichaDeAgenteDatos);
      //console.log(entradas);
      entradas.sort();
      entradas.forEach((element) => {
        //
        const elementoCero = element[0].replace("tc:", "");
        //console.log(elementoCero);
        if (!element[1]) {
          console.log("algo no esta cargado");
          var elementoDos = "No esta cargado";
        } else {
          var elementoDos = element[1];
        }
        let clavetc = element[0];
        let word = "fecha";
        if (clavetc.includes(word)) {
          elementoDos = new Date(element[1]).toLocaleDateString();
        }
        if (element[1] === false) {
          elementoDos = "No";
        }
        if (element[1] === true) {
          elementoDos = "Si";
        }
        //
        console.log(elementoDos);
        //arrayDepdf.push({ elementoCero, elementoDos });
        arrayDepdf.push([elementoCero, elementoDos]);
      });
      //console.log(map);
      var fechanacinforme = new Date(
        jsonData.entry.properties["tc:fechanacimiento"]
      ).toLocaleDateString();
      var fechaingresoinforme = new Date(
        jsonData.entry.properties["tc:fechaingreso"]
      ).toLocaleDateString();
      const fechajubinforme = new Date(
        jsonData.entry.properties["tc:fecha-jubilacion"]
      ).toLocaleDateString();
      //console.log(fichaDeAgente);
      datoModalAgente.innerHTML = `
      <div class="row">
      
    <div class="col-6">
      <div class="title">Contenido de la izquierda</div>
      <div class="card text-center">
      <div class="card-body">
        <h5 class="card-title"><dt>Cargar Novedades</></h5>
        <br>
        <input class="form-control" list="browsers" name="browser" id="browser">
            <datalist id="browsers">
                <option value="Edge">
                <option value="Firefox">
                <option value="Chrome">
                <option value="Opera">
                <option value="Safari">
            </datalist>
            <br>
            <br>
        <button type="button" class="btn btn-info">Aceptar<i class="fas fa-upload"></i></button>
      </div>
    </div>
        </div>


        <div class="col-6"> 
        <div class="title">Contenido de la derecha</div>
        <div class="card card text-center">
        <div class="card-body ">
          <h5 class="card-title"><dt>Lista Novedades</></h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
            vdkfdkbsbgslñblññsbkbnkbs
            knvnvncvvcxv.
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
            vdkfdkbsbgslñblññsbkbnkbs
            knvnvncvvcxv.
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
            vdkfdkbsbgslñblññsbkbnkbs
            knvnvncvvcxv.
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
            vdkfdkbsbgslñblññsbkbnkbs
            knvnvncvvcxv.
          </p>
      
        </div>
      </div>
        
    </div>
      
      </div>
      `;
    }
  );
}

document.getElementById("filtro").addEventListener("keyup", (e) => {
  if (e.key === "Backspace" && e.target.value === "") {
    respuesta.innerHTML = "";
    arrayDeLegajosFinal.forEach((legajo) => {
      //arrayDeNames.push(legajo.name + legajo.id);
      let nyaSinEspacios = legajo.name.replaceAll("-", " ");
      let legajoId = legajo.id;
      respuesta.innerHTML += `
                        <tr>
                            <td>${nyaSinEspacios}</td> 
                            
                            <td> <button type="button" class="btn btn-primary btn-sm" data-mdb-toggle="tooltip" title="Ver" data-toggle="modal" data-toggle="modal" data-target="#modalLRFormDemo" id="${legajoId}" onclick="datosAgente(event)"><i class="fas fa-eye" style="font-size: 14px;"></i></button></td>
                        </tr>
                        `;
    });
  }
  let arrayTempDePersonas = [];
  if (e.key === "Enter" && e.target.value != "") {
    arrayDeLegajosFinal.forEach((item) => {
      let sentence = item.name;
      let word = e.target.value.toUpperCase();

      if (sentence.includes(word)) {
        respuesta.innerHTML = "";
        let nyaSinEspacios = sentence.replaceAll("-", " ");
        let legajoId = item.id;
        arrayTempDePersonas.push({ name: nyaSinEspacios, id: legajoId });
      }
    });
    arrayTempDePersonas.forEach((item) => {
      respuesta.innerHTML += `
                            <tr>
                                <td>${item.name}</td> 
                                
                                <td> <button type="button" class="btn btn-primary btn-sm" data-mdb-toggle="tooltip" title="Ver" data-toggle="modal" data-toggle="modal" data-target="#modalLRFormDemo" id="${item.id}" onclick="datosAgente(event)"><i class="fas fa-eye" style="font-size: 14px;"></i></button></td>
                            </tr>
                            `;
    });
  }
});

function descargarpdf() {
  
  console.log(arrayDepdf);
  var docDefinition = {
    content: [
      {
        layout: "lightHorizontalLines", // optional
        table: {
          headerRows: 2,
          widths: ["auto", "auto"],
          //body: megaArrays
          body: arrayDepdf,
        },
      },
    ],
  };
  pdfMake.createPdf(docDefinition).download();
}
