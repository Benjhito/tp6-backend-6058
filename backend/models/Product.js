const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    destacado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
