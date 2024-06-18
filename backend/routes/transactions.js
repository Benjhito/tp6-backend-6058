const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST: Dar de alta una Transaccion
router.post('/', async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const transaction = await newTransaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Recuperar TODAS las Transacciones Registradas
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Recuperar el histórico de transacciones de un determinado cliente
router.get('/cliente/:email', async (req, res) => {
    try {
        const transactions = await Transaction.find({ emailCliente: req.params.email });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Recuperar TODAS las Transacciones por monedaOrigen y monedaDestino
router.get('/:monedaOrigen/:monedaDestino', async (req, res) => {
    try {
        const transactions = await Transaction.find({
            monedaOrigen: req.params.monedaOrigen,
            monedaDestino: req.params.monedaDestino
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;