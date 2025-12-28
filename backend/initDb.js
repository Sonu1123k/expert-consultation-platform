const db = require('./db');

const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS professionals (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                specialty TEXT NOT NULL,
                category TEXT NOT NULL,
                rating NUMERIC,
                reviews INTEGER,
                location TEXT,
                availability TEXT,
                image TEXT,
                experience TEXT
            );
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL,
                date TIMESTAMP NOT NULL,
                time TEXT NOT NULL,
                professional_id INTEGER REFERENCES professionals(id),
                service_id TEXT,
                status TEXT DEFAULT 'confirmed',
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('Tables initialized successfully');
    } catch (err) {
        console.error('Error initializing tables:', err);
    }
};

module.exports = initDb;
