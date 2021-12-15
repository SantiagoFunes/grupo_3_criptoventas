let express=require ("express");
let router = express.Router();
router.get("/productos",(req,res) => {
    res.render('products/productos')
})
router.get("/productos/:id", (req,res)=>{
    const paramId= parseInt(req.params.id, 10);
    const product= productList.find(productElement => productElement.id === paramId)
    if(product != null)
    {
        res.send(product);
    }
    else
    {
        res.status(404).json({msg: "No se encuentra el producto"})
    }
})
module.exports=router;

