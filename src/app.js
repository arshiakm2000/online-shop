const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://mmad:12341234@baazarbay.n4bnr.mongodb.net/?retryWrites=true&w=majority&appName=baazarbay";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.get("/", (req, res) => {
  res.redirect("/home");
});
