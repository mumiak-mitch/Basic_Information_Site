const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    if (filePath === './') {
        filePath = 'index.html';
    }

    // Check for specific routes
    if (filePath === './about') {
        filePath = 'about.html';
    } else if (filePath === './contact-me') {
        filePath = 'contact-me.html';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile('404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
        }
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open your browser and navigate to http://localhost:${PORT}`);
});
