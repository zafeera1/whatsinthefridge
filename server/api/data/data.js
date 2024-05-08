const fs = require('fs');

const rawData = fs.readFileSync('data.json');
const recipesData = JSON.parse(rawData);
