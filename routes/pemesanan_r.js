var express = require('express');
var router = express.Router();
var pemesanan = require('../models/pemesanan');

const {authenticate, authorize} = require('../middleware/auth');

// Endpoint untuk menampilkan semua pemesanan
router.get('/', async (req, res, next) => {
    try {
        const pemesanans = await pemesanan.findAll();
        res.json(pemesanans);
    } catch (err) {
        next(err);
    }
});
// Endpoint untuk menambahkan pemesanan baru
router.post('/', async (req, res, next) => {
    try {
        const { total_pesanan } = req.body;
        const newpemesanan = await pemesanan.create({ total_pesanan});
        res.status(201).json(newpemesanan);
    } catch (err) {
        next(err);
    }
});

router.put('/:ID_pemesanan', async (req, res, next) => {
    try {
        const { total_pesanan } = req.body;
        const pemesanans = await pemesanan.findByPk(req.params.ID_pemesanan);
        if (pemesanans) {
            pemesanan.total_pesanan = total_pesanan;
            await pemesanans.save();
            res.json(pemesanans);
        } else {
            res.status(404).json({ message: 'pemesanan tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:ID_pemesanan', async (req, res, next) => {
    try {
        const pemesanans = await pemesanan.findByPk(req.params.ID_pemesanan);
        if (pemesanans) {
            await pemesanans.destroy();
            res.json({ message: 'pemesanan dihapus' });
        } else {
            res.status(404).json({ message: 'pemesanan tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;