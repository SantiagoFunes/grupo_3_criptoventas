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
        res.render("products/detalle", {product})
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
        const ultimoElemento = products.slice(-1)[0]
        const nuevoProducto = {

            id:ultimoElemento.id+1,
            nombre:req.body.name,
            descripcion:req.body.description,
            marca:req.body.brand,
            modelo:req.body.model,
            precio:req.body.price,
            imagen:req.file.filename
        }
        products.push(nuevoProducto)
        const newProducts = JSON.stringify(
            products
        );
        fs.writeFileSync(productsFilePath,newProducts)
        res.redirect("/productos")

    },
    eliminarProducto:(req, res) =>{
        const productId = req.params.id;
        const productsFilePath = path.join(
            __dirname,
            "../database/productos.json"
        );
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        const product= products.find(product=> product.id==productId)
        // const 
        //     splice
        //     indexof
    }

}

module.exports= productsControllers;
