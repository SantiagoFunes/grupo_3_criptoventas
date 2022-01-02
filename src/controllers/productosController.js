const fs= require("fs");
let productosController={}

module.exports=productosController;
const path = require('path')

const productsControllers = {
    todosLosProductos:(req, res) => {
        const productsFilePath = path.join(
            __dirname,
            "../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        res.render('products/productos', {products})

    },
    detalleProducto:(req, res) => {
        const productId = req.params.id;
        const productsFilePath = path.join(
            __dirname,
            "../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        const product= products.find(product=> product.id==productId)
        if(product != null){
            res.render("products/detalle", {product}) 
        }
        else{
            res.status(404).json({msg:"No se encontro el producto"})
        }
    },
    vistaCreacion:(req, res) => {
        res.render("products/creacion")
    },
    vistaEdicion:(req, res) => {
        const productId = req.params.id;
        const productsFilePath = path.join(
            __dirname,
            "../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        const product= products.find(product=> product.id==productId)
        res.render("products/editor",{product})
    },
    nuevoProducto:(req, res)=>{
        const productsFilePath = path.join(
            __dirname,
            "../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        let productName = "sin-imagen.jpg";
        if(req.file){
            productName=req.file.filename
        }
        const ultimoElemento = products.slice(-1)[0]
        const nuevoProducto = {

            id:ultimoElemento.id+1,
            nombre:req.body.name,
            descripcion:req.body.description,
            marca:req.body.brand,
            modelo:req.body.model,
            precio:req.body.price,
            imagen:req.file.productName
        }
        products.push(nuevoProducto)
        const newProducts = JSON.stringify(
            products
        );
        fs.writeFileSync(productsFilePath,newProducts)
        res.redirect("/productos")

    },
    editarProducto:(req,res)=>{
        const productId = parseInt(req.params.id, 10);
        const productsFilePath = path.join(
            __dirname,"../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        



        const product= products.findIndex(product=> product.id===productId);
        products[product].nombre=req.body.name
        products[product].descripcion=req.body.description
        products[product].marca=req.body.brand
        products[product].modelo=req.body.model
        products[product].precio=req.body.price
        

        if(req.file){
            products[product].imagen=req.file.filename
        }

        const updatedProducts = JSON.stringify(
            products
        );
        fs.writeFileSync(productsFilePath,updatedProducts)
        res.redirect(`/productos/detalle/${req.params.id}`)
    },
    eliminarProducto:(req, res) =>{
        const productId = parseInt(req.params.id, 10);
        const productsFilePath = path.join(
            __dirname,"../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        const product= products.findIndex(product=> product.id===productId);
        products.splice(product,1);
        const newProducts = JSON.stringify(
            products
        );
        fs.writeFileSync(productsFilePath,newProducts)
        res.redirect("/productos")
        
    }

}

module.exports= productsControllers;
