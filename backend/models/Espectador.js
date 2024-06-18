const mongoose = require('mongoose');

const espectadorSchema = new mongoose.Schema({
    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    dni: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Espectador', espectadorSchema);