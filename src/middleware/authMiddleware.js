const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "grases secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "grases secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const getUser = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decodedToken = jwt.verify(token, "grases secret");
    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new Error("User not found");
    }

    return user; // Return the user if found
  } catch (err) {
    throw new Error(err.message || "Token verification failed");
  }
};
module.exports = { requireAuth, checkUser, getUser };
