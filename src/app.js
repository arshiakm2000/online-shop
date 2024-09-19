const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const retailerRoutes = require("./routes/retailerRoutes");
require("dotenv").config();
// express app
const app = express();

// connect to mongodb

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// getting the current user if logged in
app.get("*", checkUser);

// routes

app.use(authRoutes);

app.use("/", requireAuth, userRoutes);
app.use("/retail", retailerRoutes);
app.get("/", (req, res) => {
  res.redirect("/home");
});
