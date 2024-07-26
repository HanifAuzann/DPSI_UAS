const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const Pelanggan = require('../models/pelanggan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rute pendaftaran
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, role, Email, Telepon } = req.body;
        
        // Buat akun baru
        const newUser = await User.create({ username, password, role });
        const id = newUser.User_ID
        // Buat data admin jika role adalah 'admin'
        if (role === 'admin') {
            await Admin.create({ Nama : username , Email, User_ID: id });
        }

        // Buat data pelanggan jika role adalah 'pelanggan'
        if (role === 'pelanggan') {
            await Pelanggan.create({ Nama_Pelanggan : username, Telepon, User_ID: newUser.User_ID });
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        next(err);
    }
});

// Rute login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
            next(err);
    }
});

module.exports = router;
