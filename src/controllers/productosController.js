let productosController={}

module.exports=productosController;
const path = require('path')

const productsControllers = {
    detail:(req, res) => {res.render("products/detalle")},
    allProducts:(req, res) => {res.render('products/productos')},
    editor:(req, res) => {res.render('products/editor')},
    detalleId:(req, res) => {const paramId= parseInt(req.params.id, 10);
        const product= productList.find(productElement => productElement.id === paramId)
        if(product != null)
        {
            res.send(product);
        }
        else
        {
            res.status(404).json({msg: "No se encuentra el producto"})
        }},
    
    
}

module.exports= productsControllers;
