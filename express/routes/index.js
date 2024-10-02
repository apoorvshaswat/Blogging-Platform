const express = require("express");
const router = express.Router();
const { Blog, User } = require("./database");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(User.authenticate()));

router.get("/api/blogs", async (req, res) => {
  const blogPosts = await Blog.find();
  res.json(blogPosts);
});

router.post("/api/blogs", async (req, res) => {
  const newBlogPost = new Blog(req.body);
  await newBlogPost.save();
  res.status(201).json(newBlogPost);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ username, password });
  User.register(newUser, password, () => {
    passport.authenticate("local")(req, res, () => {
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

router.post("/checklogin", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (user) {
      req.logIn(user, () => {
        res.status(200).json({ message: "Login successful" });
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

module.exports = router;
