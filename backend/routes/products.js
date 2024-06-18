const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST: Dar de alta un Producto
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Recuperar TODOS los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Eliminar un producto
/*
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        await product.remove(); // Método no disponible
        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
*/
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json({ message: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Modificar un producto
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Recuperar los productos DESTACADOS
router.get('/destacados', async (req, res) => {
    try {
        const products = await Product.find({ destacado: true });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;