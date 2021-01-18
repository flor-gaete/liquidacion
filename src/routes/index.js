const router = require('express').Router();
const axios = require('axios');
const fs = require('fs')
const path = require('path')

// Ruta principal
router.get('/', async (req, res) => {
    res.sendFile(__dirname, '/index.html');
});

//esta funcion va a guardar un json en el disco
router.post('/backup', async (req, res) => {
    //console.log('Recibio la peticion');
    //data = JSON.stringify(req.body)
    data = req.body
    datosFinal = {metadata : data}
    console.log('cuerpo de la peticion: ', data)
    //procedemos a crear el archivo.
    
    fs.writeFile( '../alf-chart/src/backup/backup.json', JSON.stringify(data), (err) => {
        if(err){
            console.error(err);
            return
        }
    })
    console.log('archivo creado');
    res.send('archivo creado')
});

module.exports = router;