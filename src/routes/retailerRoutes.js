const { Router } = require("express");
const retailerController = require("../controllers/retailerController");

const router = Router();
router.get("/addItem", retailerController.addItem_get);
router.post("/addItem", retailerController.addItem_post);
router.get("/uploadPhoto", retailerController.photoUpload_get);
router.post("/uploadPhoto", retailerController.photoUpload_post);
module.exports = router;
