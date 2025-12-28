async function check() {
    try {
        const res = await fetch('http://localhost:5000/api/professionals');
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Body:', text.substring(0, 500));
    } catch (e) { console.error(e); }
}
check();
