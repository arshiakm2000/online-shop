const { Router } = require("express");
const retailerController = require("../controllers/retailerController");

const router = Router();
router.get("/addItem", retailerController.addItem_get);
module.exports = router;
