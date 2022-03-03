const fs= require("fs");
const{Producto,Clase,Imagenes_producto}=require("../../database/models")
let productosController={}
// const db = require('../../database/models');
// const Clase
// const products = db.Producto
module.exports=productosController;
const path = require('path')

const productsControllers = {
    todosLosProductos:async(req, res) => {
        const productos =  await Producto.findAll({include:['imagenes_producto']})
        
        res.render('products/productos', {productos})

    },
    detalleProducto:async(req, res) => {
        const productos =  await Producto.findOne({where: {id:req.params.id}, include:['imagenes_producto']})
        // res.send(productos);
        res.render('products/detalle', {productos})

    },
    vistaCreacion:async(req, res) => {

        const clases = await Clase.findAll();
        
        res.render("products/creacion",{clases});
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
    nuevoProducto:async(req, res)=>{
        try {
        const nuevoProducto = await Producto.create({
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            marca:req.body.marca,
            precio:req.body.precio,
            clase_id:req.body.clase
        });
        if(req.files.length > 0){
            for (let image of req.files) {
                await Imagenes_producto.create({
                    nombre_imagen: image.filename,
                    producto_id: nuevoProducto.id,
                });
            };
        }else{
            await Imagenes_producto.create({
                nombre_imagen: "sin-imagen.jpg",
                producto_id: nuevoProducto.id,
            });
        }
        
        res.redirect(`/productos/detalle/${nuevoProducto.id}`)
        } catch (error) {
        res.send(error)
        }
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
