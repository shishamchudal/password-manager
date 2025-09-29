// routes/vault.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const VaultItem = require('../models/VaultItem');
const { encrypt, decrypt } = require('../utils/crypto');

// Create vault item
// Preferred: client sends { label, username, encrypted: {ciphertext, iv, tag, salt} }
router.post('/', auth, async (req, res) => {
  try {
    const { label = '', username = '', encrypted } = req.body;
    if (!encrypted) return res.status(400).json({ error: 'encrypted object required' });

    const item = await VaultItem.create({
      user: req.user._id,
      label,
      username,
      encrypted: JSON.stringify(encrypted)
    });
    return res.json({ item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Convenience endpoint (DEMO only): accepts plaintext + masterPassword -> server encrypts then stores
router.post('/create-demo-encrypt', auth, async (req, res) => {
  try {
    const { label = '', username = '', passwordPlain, masterPassword } = req.body;
    if (!passwordPlain || !masterPassword) return res.status(400).json({ error: 'passwordPlain and masterPassword required' });

    const encrypted = encrypt(passwordPlain, masterPassword);
    const item = await VaultItem.create({
      user: req.user._id,
      label,
      username,
      encrypted: JSON.stringify(encrypted)
    });
    return res.json({ item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// List items (returns metadata and encrypted blob)
router.get('/', auth, async (req, res) => {
  try {
    const items = await VaultItem.find({ user: req.user._id }).sort({ createdAt: -1 });
    // parse encrypted JSON for each item
    const result = items.map(i => ({
      id: i._id,
      label: i.label,
      username: i.username,
      encrypted: JSON.parse(i.encrypted),
      createdAt: i.createdAt,
      updatedAt: i.updatedAt
    }));
    return res.json({ items: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/vault/:id/view
router.post('/:id/view', auth, async (req, res) => {
  try {
    const { masterPassword } = req.body;
    if (!masterPassword) return res.status(400).json({ error: 'masterPassword is required' });

    const item = await VaultItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ error: 'Not found' });

    const encrypted = JSON.parse(item.encrypted);

    try {
      const plain = decrypt(encrypted, masterPassword);
      return res.json({
        item: {
          id: item._id,
          label: item.label,
          username: item.username,
          passwordPlain: plain
        }
      });
    } catch (err) {
      return res.status(400).json({ error: 'Decryption failed. Wrong master password.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update (client should send encrypted blob)
router.put('/:id', auth, async (req, res) => {
  try {
    const { label, username, encrypted } = req.body;
    const item = await VaultItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ error: 'Not found' });

    if (label !== undefined) item.label = label;
    if (username !== undefined) item.username = username;
    if (encrypted !== undefined) item.encrypted = JSON.stringify(encrypted);
    item.updatedAt = Date.now();
    await item.save();

    return res.json({ item });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await VaultItem.deleteOne({ _id: req.params.id, user: req.user._id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
