const express = require('express');
const path = require('path');
const { clog } = require('./utils/clog');
const PORT = process.env.PORT || 3001;
const api = require('./routes/noteTaker');

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', api);

// route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

// Homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>{
    console.log(`app listening on local port ${PORT} 👂`);
});
