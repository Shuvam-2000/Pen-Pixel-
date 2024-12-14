const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    res.render('home'); 
});

app.listen(PORT, () => console.log(`Server Running At PORT:${PORT}`));
