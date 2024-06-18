const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    precioTicket: { type: Number, required: true },
    categoriaEspectador: { type: String, required: true, enum: ['e', 'l'] },
    fechaCompra: { type: String, required: true },
    espectador: { type: mongoose.Schema.Types.ObjectId, ref: 'Espectador', required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);