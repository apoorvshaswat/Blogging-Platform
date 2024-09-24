var express = require("express");
var router = express.Router();
const BlogPost = require("../routes/database");

router.get("/api/blogs", async (req, res) => {
  const blogPosts = await BlogPost.find();
  res.json(blogPosts);
});

router.post("/api/blogs", async (req, res) => {
  const { title, img_src, overview, content } = req.body;
  const newBlogPost = new BlogPost(req.body);
  await newBlogPost.save();
  res.status(201).json(newBlogPost);
});

module.exports = router;
