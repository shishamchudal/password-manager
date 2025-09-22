// models/VaultItem.js
const mongoose = require('mongoose');

const VaultItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  label: { type: String, default: '' }, // e.g., "Gmail"
  username: { type: String, default: '' },
  // Encrypted value (store ciphertext + iv + authTag + optional salt) as JSON string:
  encrypted: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VaultItem', VaultItemSchema);
