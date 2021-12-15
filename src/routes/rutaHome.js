let express=require ("express");
let router = express.Router();
router.get("/",(req,res) => {
    res.render('products/home')
 })
 module.exports=router;

