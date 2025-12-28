const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all bookings for a user
router.get('/', async (req, res) => {
    const { userId } = req.query; // In real app, get from auth middleware
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const result = await db.query(
            'SELECT * FROM bookings WHERE user_id = $1 ORDER BY date ASC, time ASC',
            [userId]
        );
        // Map snake_case database fields to camelCase for frontend compatibility if needed, 
        // or just return as is. Let's return as camelCase to match previous Mongoose output.
        const bookings = result.rows.map(row => ({
            _id: row.id, // Frontend might expect _id
            userId: row.user_id,
            date: row.date,
            time: row.time,
            professionalId: row.professional_id,
            serviceId: row.service_id,
            status: row.status,
            createdAt: row.created_at
        }));
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// POST create a booking
router.post('/', async (req, res) => {
    const { userId, date, time, serviceId, professionalId } = req.body;

    if (!userId || !date || !time || !professionalId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await db.query(
            `INSERT INTO bookings (user_id, date, time, service_id, professional_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [userId, date, time, serviceId || 'default-service', professionalId]
        );

        const row = result.rows[0];
        const savedBooking = {
            _id: row.id,
            userId: row.user_id,
            date: row.date,
            time: row.time,
            professionalId: row.professional_id,
            serviceId: row.service_id,
            status: row.status,
            createdAt: row.created_at
        };

        res.status(201).json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

module.exports = router;
