// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateSalt } = require('../utils/crypto');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const BCRYPT_ROUNDS = 12;

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const vaultSalt = generateSalt(); // salt used for deriving encryption keys (if server-side)
    const user = await User.create({ email, passwordHash, vaultSalt });

    return res.json({ message: 'User registered', userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token, vaultSalt: user.vaultSalt }); // vaultSalt useful for client-side KDF
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
