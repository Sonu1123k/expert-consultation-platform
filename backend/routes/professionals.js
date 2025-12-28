const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all professionals
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM professionals');
        // Map snake_case to camelCase
        const professionals = result.rows.map(row => ({
            _id: row.id, // Mongoose usually adds _id, but we used custom id in Mongoose too.
            id: row.id,
            name: row.name,
            specialty: row.specialty,
            category: row.category,
            rating: parseFloat(row.rating), // NUMERIC returns string
            reviews: row.reviews,
            location: row.location,
            availability: row.availability,
            image: row.image,
            experience: row.experience
        }));
        res.json(professionals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch professionals' });
    }
});

// POST seed data (One-time use)
router.post('/seed', async (req, res) => {
    const professionals = [
        {
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            category: "Medical",
            rating: 4.9,
            reviews: 127,
            location: "New York, NY",
            availability: "Available Today",
            image: "/professional-female-doctor-headshot.png",
            experience: "15 years",
        },
        {
            name: "Michael Chen",
            specialty: "Career Coach",
            category: "Career",
            rating: 4.8,
            reviews: 98,
            location: "San Francisco, CA",
            availability: "Available Today",
            image: "/professional-male-doctor.png",
            experience: "12 years",
        },
        {
            name: "Emily Rodriguez",
            specialty: "Financial Advisor",
            category: "Financial",
            rating: 5.0,
            reviews: 145,
            location: "Austin, TX",
            availability: "Available Today",
            image: "/professional-female-pediatrician-headshot.jpg",
            experience: "10 years",
        },
        {
            name: "Dr. James Williams",
            specialty: "Orthopedic Surgeon",
            category: "Medical",
            rating: 4.7,
            reviews: 83,
            location: "Chicago, IL",
            availability: "Next Available: Mon, Jan 2",
            image: "/professional-male-surgeon-headshot.jpg",
            experience: "18 years",
        },
    ];

    try {
        await db.query('DELETE FROM professionals'); // Clear existing data

        for (const p of professionals) {
            await db.query(
                `INSERT INTO professionals (name, specialty, category, rating, reviews, location, availability, image, experience)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [p.name, p.specialty, p.category, p.rating, p.reviews, p.location, p.availability, p.image, p.experience]
            );
        }
        res.json({ message: 'Database seeded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to seed database' });
    }
});

module.exports = router;
