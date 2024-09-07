const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://<db_username>:<db_password>@baazarbay.n4bnr.mongodb.net/?retryWrites=true&w=majority&appName=baazarbay";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
