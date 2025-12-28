// Native fetch is available in Node.js


async function seed() {
    try {
        const response = await fetch('http://localhost:5000/api/professionals/seed', {
            method: 'POST'
        });
        const text = await response.text();
        console.log('Response text:', text);
        const data = JSON.parse(text);
        console.log('Seed result:', data);
    } catch (error) {
        console.error('Seed error:', error);
    }
}

seed();
