// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true }, // bcrypt hash of master password
  // Optionally you can store a user-specific salt for client-side encryption metadata:
  vaultSalt: { type: String }, // hex/base64 for PBKDF2 if you choose server-side derivation
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
