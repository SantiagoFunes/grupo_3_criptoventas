const fs= require("fs");
const{Producto,Clase,Imagenes_producto}=require("../../database/models")
let productosController={}
const db = require('../../database/models');
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
    vistaEdicion:async(req, res) => {
        const clases =  await Clase.findAll();
        const productos =  await Producto.findOne({where: {id:req.params.id}, include:['imagenes_producto']})
        res.render('products/editor', {productos,clases})
    },
    search: async (req,res)=>{
        const loQueBuscoElUsuario = req.query.keyword;
        const productos = await Producto.findAll({
            where: {
                nombre:{[db.Sequelize.Op.like]:`%${loQueBuscoElUsuario}%`} 
            },include:['imagenes_producto']
        })
        
        res.render('products/productos', {productos})
    },
    nuevoProducto:async(req, res)=>{
        try {
        const nuevoProducto = await Producto.create({
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            marca:req.body.marca,
            modelo:req.body.modelo,
            precio:req.body.precio,
            clase_id:req.body.clase
        });
        if(req.files.length > 0){
            for (let image of req.files) {
                const validationExtensionImage = ['jpeg','jpg','png','gif'].includes(image.filename.toLowerCase().split('.')[1])
                if(validationExtensionImage){
                    await Imagenes_producto.create({
                     nombre_imagen: image.filename,
                        producto_id: nuevoProducto.id,
                 });
                }
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
    editarProducto:async(req,res)=>{ 
        await Producto.update({
                nombre:req.body.name,
                descripcion:req.body.description,
                marca:req.body.brand,
                precio:req.body.price,
                modelo:req.body.modelo,
                clase_id:req.body.model
        },{
            
            where:{ id: req.params.id}
        
        });

        res.redirect("/productos/detalle/" + req.params.id)
    },
    eliminarProducto:async(req, res) =>{
        let productoDestruir = req.params.id;
        await Imagenes_producto.destroy({
            where:{producto_id: productoDestruir}
        });
        res.redirect("/productos")
         await Producto.destroy({
             where:{id: productoDestruir}
         });
    }
}

module.exports= productsControllers;
