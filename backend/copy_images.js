const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:/Users/vatsa/.gemini/antigravity/brain/a8cee181-6f0b-4518-9201-586596159246';
const publicDir = 'c:/Users/vatsa/OneDrive/Desktop/dew/frontend/public';

const femaleSource = path.join(artifactsDir, 'female_doctor_headshot_1766822625208.png');
const maleSource = path.join(artifactsDir, 'male_doctor_headshot_1766822643560.png');

const mappings = [
    { dest: 'professional-female-doctor-headshot.png', source: femaleSource },
    { dest: 'professional-male-doctor.png', source: maleSource },
    { dest: 'professional-female-pediatrician-headshot.jpg', source: femaleSource },
    { dest: 'professional-male-surgeon-headshot.jpg', source: maleSource },
    { dest: 'female-dermatologist.jpg', source: femaleSource },
    { dest: 'male-cardiologist.jpg', source: maleSource },
    { dest: 'female-pediatrician.jpg', source: femaleSource },
    { dest: 'male-neurologist.jpg', source: maleSource },
];

mappings.forEach(map => {
    const destPath = path.join(publicDir, map.dest);
    try {
        fs.copyFileSync(map.source, destPath);
        console.log(`Copied to ${map.dest}`);
    } catch (err) {
        console.error(`Error copying to ${map.dest}:`, err);
    }
});
