const router = require('express').Router();
const Legajo = require('../models/Legajo');

router.get('/estadisticas-personal', async (req, res)=> {
    const legajos = await Legajo.find();
    res.send(legajos);
});

module.exports = router;
