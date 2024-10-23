const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/blog_db");

mongoose.connect(process.env.MONGODB_URI);

const blogSchema = new mongoose.Schema({
  title: String,
  img_src: String,
  overview: String,
  content: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  dateCreated: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose);

const Blog = mongoose.model("Blog", blogSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Blog, User };
