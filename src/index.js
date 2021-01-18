const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

require('./database/connectiondb');

// Configuraciones
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json({}));
app.use(express.json({limit: '50mb'}));
app.use(morgan('dev'));
app.use(cors());
app.set('port', process.env.PORT || 4500);

// Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/estadisticas.routes'));



// Servidor corriendo
app.listen(app.get('port'), ()=> {
    console.log(`Servidor escuchando el puerto ${app.get('port')}`);
});
