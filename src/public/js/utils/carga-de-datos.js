//config del fetch
let TotalDeLegajos = 0;
const username = 'sanabriaa';
const password = 'sanabriaa2020';
const url = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/7445ea46-42ff-49b8-9989-205870978022/children`;
const headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
//


// Primera consulta para obtener la cantidad total de nodos
export const primerConsulta = async () => {
    try {
        let dataUno = await fetch(url, { method: 'GET', headers });
        let jsonDataUno = await dataUno.json();
        console.log('Total legajos', jsonDataUno.list.pagination.totalItems);
        TotalDeLegajos = jsonDataUno.list.pagination.totalItems;
    } catch (error) {
        console.log('Error en primeraConsulta: ', error);
    }

    return TotalDeLegajos;
}


// Segunda consulta para obtener las referencias de cada nodo
export const segundaConsulta = async (TotalDeLegajos) => {
    const urlDos = `${url}/?maxItems=${TotalDeLegajos}`;
    let arrayDeLegajos;
    try {
        let dataDos = await fetch(urlDos, { method: 'GET', headers });
        let jsonDataDos = await dataDos.json();
        arrayDeLegajos = jsonDataDos.list.entries;
    } catch (error) {
        console.log('Error en segundaConsulta: ', error);
    }
    return arrayDeLegajos;
}

// Consulta por cada nodo
export const terceraConsulta = async (arrayDeLegajos) => {
    let MetadatosDeLegajos = [];
    arrayDeLegajos.forEach(async legajo => {
        
        try {
            let urlLegajos = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/${legajo.entry.id}`;
            let data = await fetch(urlLegajos, { method: 'GET', headers: headers });
            let jsonData = await data.json();
            MetadatosDeLegajos.push(jsonData);
        } catch (error) {
            console.log('Error en terceraConsulta: ', error);   
        }

    });
    return MetadatosDeLegajos;
};

// Envía todos los metadatos obtenidos anteriormente
const guardarDatosDeLegajos = async MetadatosDeLegajos => {
    await fetch('http://localhost:4500/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(MetadatosDeLegajos)
    });
};

// Referencia al botón que ejecutará la acción de obtener los datos de Alfresco
let actualizarDatos = document.querySelector('#actualizar-datos');
// actualizarDatos.addEventListener('click', async function (e) {
    window.addEventListener('load', async function (e) {
    console.log("click!")
    e.preventDefault()

    const TotalDeLegajos = await primerConsulta();
    const arrayDeLegajos = await segundaConsulta(TotalDeLegajos);
    const MetadatosDeLegajos = await terceraConsulta(arrayDeLegajos);
    if(MetadatosDeLegajos){
        console.error('Datos recibidos correctamente')
        console.log(MetadatosDeLegajos);
    }


    //const respuesta = await guardarDatosDeLegajos(MetadatosDeLegajos);
    // if(respuesta){
    //     console.log('Documentos actualizados correctamente');
    // };
});

// 
// Función que devuelve datos de legajos incompletos
const legajosIncompletos = async arrIdLegajos => {
    let legajos = [];
    arrIdLegajos.forEach(async id => {
        try {
            let urlLegajos = `http://10.254.254.65/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}`;
            let data = await fetch(urlLegajos, { method: 'GET', headers: headers });
            let jsonData = await data.json();
            legajos.push(jsonData);
        } catch (error) {
            console.log('Error en terceraConsulta: ', error);   
        }
    });

    return legajos;
};
// legajosIncompletos(["55d4ba08-5fff-4b60-aa4d-673b54f9f9be", "549766e3-098c-4403-ba33-70e48b511d74", "16143fee-3260-4e99-82f0-95f6ca4aa7f8", "6a47f40f-130d-477b-bf5e-b25530b0e737"]);
// .then( console.log );
//