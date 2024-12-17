const { Router } = require('express');
const Blog = require('../models/blog');

const router = Router();

// routes for adding new blog
router.get('/add-new', (req,res) => {
    return res.render('addblog', {
        user: req.user,
    })
})

// route for adding blogs
router.post('/', (req,res) => {
    return res.render('addblog', {
        user: req.user,
    })
})

module.exports = router;