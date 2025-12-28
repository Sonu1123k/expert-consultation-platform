const express = require('express');
const cors = require('cors');
const initDb = require('./initDb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Initialization
initDb();

// Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

const bookingRoutes = require('./routes/bookings');
const professionalRoutes = require('./routes/professionals');

app.use('/api/bookings', bookingRoutes);
app.use('/api/professionals', professionalRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
