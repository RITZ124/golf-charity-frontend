const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./jobs/monthlyDrawJob');

const authRoutes = require('./routes/authRoutes');

const app = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================
app.use('/api/auth', authRoutes);
app.use('/api/scores', require('./routes/scoreRoutes'));
app.use('/api/charities', require('./routes/charityRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/draws', require('./routes/drawRoutes'));
app.use('/api/winners', require('./routes/winnerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// ================= HEALTH CHECK =================
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running successfully 🚀',
  });
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error('Global Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
}