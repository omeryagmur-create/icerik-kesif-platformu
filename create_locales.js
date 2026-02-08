const fs = require('fs');
const path = require('path');

const locales = ['zh', 'es', 'ar', 'hi', 'pt', 'ru', 'ja', 'de', 'fr', 'id', 'vi', 'ko', 'it', 'fa', 'pl', 'nl', 'uk', 'th', 'sv', 'ro', 'cs', 'el', 'hu', 'da', 'fi', 'he', 'no', 'bn'];

const templatePath = path.join(__dirname, 'messages', 'en.json');
const template = fs.readFileSync(templatePath, 'utf8');

locales.forEach(locale => {
    const filePath = path.join(__dirname, 'messages', `${locale}.json`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template);
        console.log(`Created ${filePath}`);
    } else {
        console.log(`Skipped ${filePath} (exists)`);
    }
});
