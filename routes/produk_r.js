var express = require('express');
var router = express.Router();
var Produk = require('../models/produk');

const {authenticate, authorize} = require('../middleware/auth');

// Endpoint untuk menampilkan semua produk
router.get('/', async (req, res, next) => {
    try {
        const Produks = await Produk.findAll();
        res.json(Produks);
    } catch (err) {
        next(err);
    }
});
// Endpoint untuk menambahkan produk baru
router.post('/', async (req, res, next) => {
    try {
        const { nama_produk, harga, stok } = req.body;
        const newProduk = await Produk.create({ nama_produk, harga, stok});
        res.status(201).json(newProduk);
    } catch (err) {
        next(err);
    }
});

router.put('/:kode_produk',  async (req, res, next) => {
    try {
        const { nama_produk, harga, stok } = req.body;
        const Produks = await Produk.findByPk(req.params.kode_produk);
        if (Produks) {
            Produks.nama_produk = nama_produk;
            Produks.harga = harga;
            Produks.stok = stok;
            await Produks.save();
            res.json(Produks);
        } else {
            res.status(404).json({ message: 'produk tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:kode_produk', async (req, res, next) => {
    try {
        const Produks = await Produk.findByPk(req.params.kode_produk);
        if (Produks) {
            await Produks.destroy();
            res.json({ message: 'produk dihapus' });
        } else {
            res.status(404).json({ message: 'produk tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;