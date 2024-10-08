const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/home", authController.homeRes);

module.exports = router;
