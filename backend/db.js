const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
require('dotenv').config();

class WebSocketIPv4 extends ws {
    constructor(url, protocols) {
        super(url, protocols, { family: 4 });
    }
}

neonConfig.webSocketConstructor = WebSocketIPv4;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
