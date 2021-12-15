let express=require ("express");
const productsControllers = require("../controllers/productosController");
let router = express.Router();


router.get("/", productsControllers.detail)

 module.exports=router;

