let express=require ("express");
let router = express.Router();
router.get("/detalle",(req,res) => {
    res.render('products/detalle')
})
module.exports=router;