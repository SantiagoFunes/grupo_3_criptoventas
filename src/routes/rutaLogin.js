let express = require("express");
const controllers = require("../controllers/homeController");
let router = express.Router();

router.get("/", controllers.login);

module.exports = router;
