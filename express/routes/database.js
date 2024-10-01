const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/blog_db");

mongoose.connect("mongodb+srv://shaswatapoorv:yX7k6t0fjoh8fhkl@cluster0.o8qhz.mongodb.net/blog_db?retryWrites=true&w=majority");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img_src: { type: String },
  overview: { type: String },
  content: { type: String },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
