const express = require("express");
const router = express.Router();

const { Blog, User } = require("./database");

// for handling authentication
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/api/checklogin", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: "User is authenticated" });
  }
  return res.status(401).json({ message: "User is not authenticated" });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ username });
  await User.register(newUser, password);
  passport.authenticate("local")(req, res, () => {
    res.status(201).json({ message: "User registered successfully" });
  });
});

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/api/blogs", async (req, res) => {
  const blogPosts = await Blog.find();
  res.json(blogPosts);
});

router.post("/api/blogs", async (req, res) => {
  const newBlogPost = new Blog(req.body);
  await newBlogPost.save();
  res.status(201).json(newBlogPost);
});

router.put("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData);
  res.status(200).json(updatedBlog);
});

router.delete("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(200).json({ message: "Blog post deleted successfully" });
});

module.exports = router;
