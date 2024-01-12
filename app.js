// /mnt/data/app.js
// Express.js alkalmazás weboldalak képpé konvertálásához

const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const path = require('path');

// Inicializálás

const app = express();

// Body parser middleware az űrlapok beküldésének kezeléséhez
app.use(bodyParser.urlencoded({ extended: false }));

// Statikus fájlok kiszolgálása a 'public' könyvtárból
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint a főoldal megjelenítéséhez
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint a konverziós kérések feldolgozásához

app.post('/convert', async (req, res) => {
    const { url, html } = req.body;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Ha URL van megadva, navigáljon oda, különben állítsa be a HTML tartalmat
        if (url) {
            await page.goto(url);
        } else if (html) {
            await page.setContent(html);
        } else {
            throw new Error('Nincs megadva URL vagy HTML tartalom');
        }

        // Képernyőkép készítése és válaszként küldése
        const imageBuffer = await page.screenshot({ fullPage: true });
        await browser.close();
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length
        });
        res.end(imageBuffer, 'binary');
    } catch (error) {
        res.status(500).send(`Hiba a konverzió során: ${error.message}`);
    }
});

// A szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));

