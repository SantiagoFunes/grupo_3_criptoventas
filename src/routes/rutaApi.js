let express=require ("express");
const apiController = require("../controllers/apiController");
let router = express.Router();

router.get("/users", apiController.usersDisplay);
router.get("/users/last", apiController.usersLast);
router.get("/users/:id", apiController.usersDetail);

router.get("/products", apiController.productsDisplay);
router.get("/products/last", apiController.productsLast);
router.get("/products/:id", apiController.productsDetail);


module.exports=router;
