// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const vaultRoutes = require('./routes/vault');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI);

// Middlewares
app.use(helmet());
app.use(cors({
  origin: 'https://melodious-pothos-008ddd.netlify.app',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }); // adjust
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
