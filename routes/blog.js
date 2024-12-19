const { Router } = require('express');
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  })

const upload = multer({ storage: storage })

// routes for adding new blog
router.get('/add-new', (req,res) => {
    return res.render('addblog', {
        user: req.user,
    })
})

// route for adding blogs
router.post('/', upload.single('coverImage'), async (req,res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
    });

module.exports = router;