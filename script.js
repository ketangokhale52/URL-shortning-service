const urlDatabase = {};



function generateShortCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shortCode;
}




function encodeURL(longURL) {
    let shortCode;
    do {
        shortCode = generateShortCode();
    } while (urlDatabase[shortCode]);

    urlDatabase[shortCode] = longURL;
    return `http://Ketan-URLshort/${shortCode}`;
}





function decodeURL(shortURL) {
    const shortCode = shortURL.split('/').pop(); // 
    const longURL = urlDatabase[shortCode];
    if (longURL) {
        window.location.href = longURL;
    } else {
        console.error("Short URL not found!");
    }
}




document.getElementById("shortenForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const longURL = document.getElementById("longURL").value;
    const shortURL = encodeURL(longURL);
    document.getElementById("shortenedURL").innerHTML = `Shortened URL: <a href="${shortURL}" target="_blank">${shortURL}</a>`;
});





const express = require('express');
const app = express();
app.get('/:shortCode', (req, res) => {
const shortCode = req.params.shortCode;
const longURL = urlDatabase[shortCode];
if (longURL) {
res.redirect(longURL); 
} else {
res.status(404).send('Short URL not found');
}
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});