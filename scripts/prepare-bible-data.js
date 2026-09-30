const fs = require("fs");
const path = require("path");

const source = path.resolve(__dirname, "..", "bible-data");
const destination = path.resolve(__dirname, "..", "www", "bible-data");

if (!fs.existsSync(source)) {
    throw new Error(`Dossier source introuvable: ${source}`);
}

fs.rmSync(destination, { recursive: true, force: true });
fs.cpSync(source, destination, { recursive: true });
console.log(`Données bibliques copiées dans ${destination}`);