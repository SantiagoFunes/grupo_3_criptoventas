let express=require ("express");
const productsControllers = require("../controllers/productosController");
let router = express.Router();


router.get("/", productsControllers.allProducts)

 



router.get("/:id", productsControllers.detalleId)

module.exports=router;

