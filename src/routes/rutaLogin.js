let express = require("express");
const controllers = require("../controllers/homeController");
const path = require("path");
const multer = require("multer")

let router = express.Router();

router.get("/", controllers.login);
router.post("/user", )

module.exports = router;
