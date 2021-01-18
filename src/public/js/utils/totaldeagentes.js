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
      <div class="container">

      <div class="row">
        <div class="w-50"><label>Nombre y Apellido</label></div>
        <div  class="w-50"> 
          <input value="${
            jsonData.entry.properties["tc:apellido-y-nombre"]
              ? jsonData.entry.properties["tc:apellido-y-nombre"]
              : "no se cargo"
          }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
        <div class="w-50"><label>Numero de Legajo</label></div>
        <div class="w-50">
          <input value="${
            jsonData.entry.properties["tc:legajo"]
              ? jsonData.entry.properties["tc:legajo"]
              : "no se cargo"
          }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>  
      </div>
      <div class="row">
        <div class="w-50"><label>Instrumento Legal</label></div>
        <div class="w-50">
          <input value="${
            jsonData.entry.properties["tc:instrumentolegal"]
              ? jsonData.entry.properties["tc:instrumentolegal"]
              : "no se cargo"
          }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Categoria</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:categoria"]
            ? jsonData.entry.properties["tc:categoria"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
        <div class="w-50"><label>CUIL</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:cuilok"]
            ? jsonData.entry.properties["tc:cuilok"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Dependencia</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:dependencia"]
            ? jsonData.entry.properties["tc:dependencia"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Telefono</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:telcelular"]
            ? jsonData.entry.properties["tc:telcelular"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Correo Electronico</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:emailoficial"]
            ? jsonData.entry.properties["tc:emailoficial"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Edad</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:edad"]
            ? jsonData.entry.properties["tc:edad"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Antigüedad</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:antiguedad"]
            ? jsonData.entry.properties["tc:antiguedad"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Fecha de Jubilacion</label></div>
        <div class="w-50">
        <input value="${
          fechajubinforme
            ? fechajubinforme
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Fecha de Ingreso</label></div>
        <div class="w-50">
        <input value="${
          fechaingresoinforme
            ? fechaingresoinforme
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Fecha de Nacimiento</label></div>
        <div class="w-50">
        <input value="${
          fechanacinforme
            ? fechanacinforme
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Domicilio</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:domicilio"]
            ? jsonData.entry.properties["tc:domicilio"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Situacion</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:situacion"]
            ? jsonData.entry.properties["tc:situacion"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Sector</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:sector"]
            ? jsonData.entry.properties["tc:sector"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Razones Particulares</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:razones-particulares"]
            ? jsonData.entry.properties["tc:razones-particulares"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Grado de formacion</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:formacion"]
            ? jsonData.entry.properties["tc:formacion"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Titulo</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:titulo"]
            ? jsonData.entry.properties["tc:titulo"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
        </div>
      </div>
      <div class="row">
      <div class="w-50"><label>Cantidad de Hijos</label></div>
        <div class="w-50">
        <input value="${
          jsonData.entry.properties["tc:hijos"]
            ? jsonData.entry.properties["tc:hijos"]
            : "no se cargo"
        }" disabled type="text" id="form-number" class="informeinput form-control">
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
