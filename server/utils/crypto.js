// utils/crypto.js
const crypto = require('crypto');

const ALGO = 'aes-256-gcm';
const KEY_LEN = 32; // 256 bits
const IV_LEN = 12; // recommended for GCM
const SALT_LEN = 16;
const PBKDF2_ITER = 200000;
const DIGEST = 'sha256';

function generateSalt() {
  return crypto.randomBytes(SALT_LEN).toString('hex');
}

function deriveKey(password, saltHex) {
  const salt = Buffer.from(saltHex, 'hex');
  return crypto.pbkdf2Sync(password, salt, PBKDF2_ITER, KEY_LEN, DIGEST); // Buffer
}

function encrypt(plainText, password) {
  // generate salt and derive key
  const salt = generateSalt();
  const key = deriveKey(password, salt); // Buffer
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, key, iv, { authTagLength: 16 });
  const ciphertext = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    salt // hex
  };
}

function decrypt(encryptedObj, password) {
  const { ciphertext, iv, tag, salt } = encryptedObj;
  const key = deriveKey(password, salt);
  const decipher = crypto.createDecipheriv(ALGO, key, Buffer.from(iv, 'hex'), { authTagLength: 16 });
  decipher.setAuthTag(Buffer.from(tag, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, 'base64')),
    decipher.final()
  ]);
  return decrypted.toString('utf8');
}

module.exports = {
  generateSalt,
  deriveKey,
  encrypt,
  decrypt
};
