let express=require ("express");
let router = express.Router();
router.get("/creacionyedicion",(req,res) => {
    res.render('products/editor')
})
module.exports=router;