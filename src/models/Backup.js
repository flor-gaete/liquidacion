const { Schema, model } = require('mongoose');

const backupSchema = new Schema({
    entries: {
        type: Array
    }
});

module.exports = model('Backup', backupSchema);