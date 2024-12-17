const express = require('express');
const path = require('path');
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const { checkForAunthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 8000;

// connecting to the database
mongoose.connect('mongodb://localhost:27017/wordweave').then(() => {
    console.log("MongoDB Connected SuccesFully")
})

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.resolve('./views'));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkForAunthenticationCookie('token'))

app.get('/', (req, res) => {
    res.render('home',{
        user: req.user,
    }); 
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, () => console.log(`Server Running At PORT:${PORT}`));
