let express=require ("express");
const productsControllers = require("../controllers/productosController");
let router = express.Router();


router.get("/", productsControllers.editor)

 module.exports=router;
