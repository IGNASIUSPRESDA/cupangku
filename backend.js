const express = require('express');
const app = express();
const fs = require('fs'); // Modul untuk membaca file
const port = 3000;

app.get('/', (req, res) => {
    // Baca file HTML dari sistem file
    fs.readFile('index.html', 'utf8', (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Terjadi kesalahan.');
        } else {
            // Baca file CSS dari sistem file
            fs.readFile('style.css', 'utf8', (err, css) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Terjadi kesalahan.');
                } else {
                    // Gabungkan file HTML dan CSS ke dalam satu respons
                    const fullHTML = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>${css}</style>
                        </head>
                        <body>
                            ${html}
                        </body>
                        </html>
                    `;
                    // Setel header tipe konten sebagai HTML
                    res.setHeader('Content-Type', 'text/html');
                    // Kirim file HTML dan CSS sebagai respons
                    res.send(fullHTML);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
