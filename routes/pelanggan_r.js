var express = require('express');
var router = express.Router();
var Pelanggan = require('../models/pelanggan');

const {authenticate, authorize} = require('../middleware/auth');

// Endpoint untuk menampilkan data
router.get('/', async (req, res, next) => {
    try {
        const Pelanggans = await Pelanggan.findAll();
        res.json(Pelanggans);
    } catch (err) {
        next(err);
    }
});
// Endpoint untuk menambahkan data baru
router.post('/', async (req, res, next) => {
    try {
        const { Nama_Pelanggan, Telepon } = req.body;
        const newPelanggan = await Pelanggan.create({ Nama_Pelanggan, Telepon});
        res.status(201).json(newPelanggan);
    } catch (err) {
        next(err);
    }
});

router.put('/:ID_Pelanggan', async (req, res, next) => {
    try {
        const { nama_pelanggan, telepon } = req.body;
        const Pelanggans = await Pelanggan.findByPk(req.params.ID_Pelanggan);
        if (Pelanggans) {
            Pelanggans.nama_pelanggan = nama_pelanggan;
            Pelanggans.telepon = telepon;
            await Pelanggans.save();
            res.json(Pelanggans);
        } else {
            res.status(404).json({ message: 'data tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:ID_Pelanggan', async (req, res, next) => {
    try {
        const Pelanggans = await Pelanggan.findByPk(req.params.ID_Pelanggan);
        if (Pelanggans) {
            await Pelanggans.destroy();
            res.json({ message: 'data dihapus' });
        } else {
            res.status(404).json({ message: 'data tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;