const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const { User } = require("./routes/database");
const blogRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "build")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://blogging-platform-1-rp5u.onrender.com",
    credentials: true,
  })
);

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "your-secret",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", blogRoutes);
app.get("/:random", (req, res) => {
  res.render("unknownroute");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
