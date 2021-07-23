const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const { clog } = require('./utils/clog');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

// 404 page. remember to implement
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
)

app.listen(PORT, () =>{
    console.log(`app listening on local port ${PORT} 👂`);
});
