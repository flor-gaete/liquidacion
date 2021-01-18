const { Schema, model } = require('mongoose');

const newLegajoSchema = new Schema({
    entry: {
        type: Object
    }
});

module.exports = model('Legajo', newLegajoSchema);