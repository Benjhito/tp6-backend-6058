const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Espectador = require('../models/Espectador');

// POST: Dar de alta un ticket
router.post('/', async (req, res) => {
    try {
        const espectador = await Espectador.findById(req.body.espectador);
        if (!espectador) return res.status(404).json({ message: 'Espectador no encontrado' });

        const newTicket = new Ticket(req.body);
        const ticket = await newTicket.save();
        res.status(201).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Recuperar TODOS los tickets, incluyendo la información de los espectadores
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('espectador');
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Eliminar un ticket
/*
router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });

        await ticket.remove();  // Método no disponible
        res.json({ message: 'Ticket eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
*/
router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });

        res.json({ message: 'Ticket eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Modificar un ticket
router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado' });

        // Validar si el nuevo espectador existe
        if (req.body.espectador) {
            const espectador = await Espectador.findById(req.body.espectador);
            if (!espectador) return res.status(404).json({ message: 'Espectador no encontrado' });
        }

        Object.assign(ticket, req.body);
        await ticket.save();
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Recuperar SOLO los espectadores que tienen una determinada categoría de espectador
/*
router.get('/categoria/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        if (!['e', 'l'].includes(categoria)) {
            return res.status(400).json({ message: 'Categoría inválida' });
        }

        const tickets = await Ticket.find({ categoriaEspectador: categoria }).populate('espectador');
        const espectadores = tickets.map(ticket => ticket.espectador);
        res.json(espectadores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
*/
router.get('/categoria/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        if (!['e', 'l'].includes(categoria)) {
            return res.status(400).json({ message: 'Categoría inválida' });
        }

        // Encontrar los tickets de la categoría especificada
        const tickets = await Ticket.find({ categoriaEspectador: categoria }).populate('espectador');
        
        // Devolver los tickets en lugar de los espectadores
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;