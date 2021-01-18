const router = require('express').Router();
// const Legajos = require('../models/Legajos');
const Legajo = require('../models/Legajo');
const Backup = require('../models/Backup');
// Ruta principal
router.get('/', async (req, res) => {
    res.sendFile(__dirname, '/index.html');
});

router.post('/backup', async (req, res)=> {
    let properties = req.body;
    backup = { entry: properties };
    let newBackup = new Backup(backup);
    await newBackup.save();
    res.send('Copia de seguridad realizada!');
});

module.exports = router;