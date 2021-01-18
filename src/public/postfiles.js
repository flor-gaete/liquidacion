var username = "sanabriaa";
var password = "sanabriaa2020";
var url = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/28981821-6b46-4abe-9bbf-520689c03941/children`;
const authString = `${username}:${password}`;
let headers = new Headers();
headers.set("Authorization", "Basic " + btoa(authString));

let archivo = "";
let nombreArchivo = "";

document.getElementById("inputGroupFile01").addEventListener("change", (e) => {
  console.log(e.target.files[0].name);
  nombreArchivo = e.target.files[0].name;
  archivo = e.target;
  //console.log(nombreArchivo);
  console.log(archivo);
  document.getElementById("labelSubir").innerHTML = nombreArchivo;
});

const postData = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YmVuaXRlemRhOmJlbml0ZXpkYTIwMjA=");

  var archivo = document.getElementById("inputGroupFile01");

  var formdata = new FormData();
  formdata.append("filedata", archivo.files[0]);
  formdata.append("name", nombreArchivo);
  formdata.append("nodeType", "cm:content");
  formdata.append("cm:title", "texto");
  formdata.append("cm:description", "description");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
//559b99c3-3b5f-4b3d-b69f-709bd1322f5e
//28981821-6b46-4abe-9bbf-520689c03941
  fetch(
    "http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/28981821-6b46-4abe-9bbf-520689c03941/children",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result.entry)
      getContenido()
    })
    .catch((error) => console.log("error", error));
};
////////////
const getContenido = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YWRtaW46c2VyYWxmMjAxOQ==");
  const listaDiv = document.getElementById("listadearchivos")
  listaDiv.innerHTML = ''
  const options = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  }
  fetch(
    "http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/28981821-6b46-4abe-9bbf-520689c03941/children",
    options
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      let entradas = Object.entries(result.list.entries);
      
      console.log(entradas);
      entradas.forEach((element) => {
        console.log(element[1].entry.name);
        if (element[1].entry.isFolder) {
          listaDiv.innerHTML += `<div style="flex-direction: row;">
                                  <i class="fas fa-folder-plus green-text"></i><p>${element[1].entry.name}</p>
                                </div>`
        }
        if (element[1].entry.isFile) {
          listaDiv.innerHTML += `<div style="flex-direction: row;">
                                  <i class="far fa-file-alt indigo-text"></i><p>${element[1].entry.name}</p>
                                </div>`
        }
      })
    })
    .catch((error) => console.log("error", error));
}

window.addEventListener('load',() => getContenido())