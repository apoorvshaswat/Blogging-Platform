const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/blog_db");
mongoose.connect(process.env.MONGODB_URI);

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img_src: { type: String },
  overview: { type: String },
  content: { type: String },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose);

const Blog = mongoose.model("Blog", blogSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Blog,
  User,
  serializeUser: User.serializeUser(),
  deserializeUser: User.deserializeUser(),
};
