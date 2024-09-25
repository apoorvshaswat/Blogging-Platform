const express = require("express");
const cors = require("cors");
const path = require("path");

const blogRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
