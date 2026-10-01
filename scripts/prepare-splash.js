const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "assets", "splash.png");
const destinationDir = path.join(__dirname, "..", "www", "assets");
const destination = path.join(destinationDir, "splash.png");

if (!fs.existsSync(source)) {
  throw new Error("Image source introuvable : assets/splash.png");
}

fs.mkdirSync(destinationDir, { recursive: true });
fs.copyFileSync(source, destination);

console.log("Splash E-BIBLIA copié vers www/assets/splash.png");
