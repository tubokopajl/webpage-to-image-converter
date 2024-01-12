
// /mnt/data/app.js
// Express.js Application for Webpage to Image Conversion

const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express application
const app = express();

// Body parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint for rendering the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint for processing conversion requests
app.post('/convert', async (req, res) => {
    const { url, html } = req.body;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // If URL is provided, navigate to it, otherwise set HTML content
        if (url) {
            await page.goto(url);
        } else if (html) {
            await page.setContent(html);
        } else {
            throw new Error('No URL or HTML content provided');
        }

        // Take a screenshot and send it as a response
        const imageBuffer = await page.screenshot({ fullPage: true });
        await browser.close();
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length
        });
        res.end(imageBuffer, 'binary');
    } catch (error) {
        res.status(500).send(`Error during conversion: ${error.message}`);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
