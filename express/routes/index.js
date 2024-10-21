const express = require("express");
const router = express.Router();
const { Blog, User } = require("./database");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized: Please log in" });
};

router.get("/api/checklogin", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: "User is authenticated" });
  }
  return res.status(401).json({ message: "User is not authenticated" });
});

router.get("/api/blogs", async (req, res) => {
  const blogPosts = await Blog.find();
  res.json(blogPosts);
});

router.post("/api/blogs", isAuthenticated, async (req, res) => {
  const newBlogPost = new Blog(req.body);
  await newBlogPost.save();
  res.status(201).json(newBlogPost);
});

router.put("/api/blogs/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog post not found" });
  }
  res.status(200).json(updatedBlog);
});

router.delete("/api/blogs/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) {
    return res.status(404).json({ message: "Blog post not found" });
  }
  res.status(200).json({ message: "Blog post deleted successfully" });
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
    if (err) {
      console.error("Error during login:", err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
