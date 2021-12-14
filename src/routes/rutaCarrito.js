
let express=require ("express");
let router = express.Router();
router.get("/carrito",(req,res) => {
    res.render('products/carrito')
})
module.exports=router;