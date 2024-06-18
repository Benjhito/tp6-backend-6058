const express = require('express');
const router = express.Router();
const Espectador = require('../models/Espectador');

// POST: Dar de alta un Espectador
router.post('/', async (req, res) => {
    try {
        const newEspectador = new Espectador(req.body);
        const espectador = await newEspectador.save();
        res.status(201).json(espectador);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Obtener todos los Espectadores
router.get('/', async (req, res) => {
    try {
        const espectadores = await Espectador.find();
        res.json(espectadores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Obtener UN Espectador
router.get('/:id', async (req, res) => {
    try {
        const espectador = await Espectador.findById(req.params.id);
        if (!espectador) return res.status(404).json({ message: 'Espectador no encontrado' });
        res.json(espectador);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;