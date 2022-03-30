// const fs= require("fs");
// const path = require('path');
const res = require('express/lib/response');
const db = require('../../database/models');
const Op = db.sequelize.Op;

const apiController = {

    usersDisplay:async(req,res)=>{
        const usuarios = await db.Usuario.findAll()
        const usuariosEdited = usuarios.map((usuario)=>{
            return {
                id:usuario.id,
                nombre:usuario.nombre,
                email:usuario.email,
                apellido:usuario.apellido,
                detalle: 'http://localhost:3000/users/profile'
            }
        })
            return res.status(200).json({
                count:usuarios.length,
                users:usuariosEdited,
                status:200
            });
        
    },
    usersDetail:async (req,res)=>{
        const usuario = await db.Usuario.findByPk(req.params.id)
        const usuarioEdited = 
             {
                id:usuario.id,
                nombre:usuario.nombre,
                email:usuario.email,
                profileImg:'http://localhost:3000/images/'+usuario.img,
                detalle: 'http://localhost:3000/users/profile'

            }
            return res.status(200).json({
                user:usuarioEdited,
                status:200
            });

    },
    usersLast:async(req,res)=>{


        const usuarios = await db.Usuario.findAll()
        const usuariosEdited = usuarios[usuarios.length-1]
        const UltimoUsuario = {
            id: usuariosEdited.id,
            nombre:usuariosEdited.nombre,
            apellido:usuariosEdited.apellido,
            email:usuariosEdited.email,
            img:usuariosEdited.img
        }

         return res.status(200).json({
             UltimoUsuario:UltimoUsuario,
             status:200
         });

    },
    productsDisplay:async(req,res)=>{
        const productos = await db.Producto.findAll({
            include:["clase"]
        })
        const clases = await db.Clase.findAll({
            include:["producto"]
        })
        const clasesEdited = clases.map((clase) => {
            let cantProducts = 0;
            cantProducts += clase.producto.length;
            return {
                id: clase.id,
                name: clase.nombre,
                totalProducts: cantProducts,
            };
        });
        res.header("Access-Control-Allow-Origin", "*");
        const productosEdit = productos.map((producto)=>{
            return {
                id: producto.id,
                nombre: producto.nombre,
                descripcion:producto.descripcion,
                clase:producto.clase.nombre,
                detalle:"http://localhost:3000/productos/detalle/"+ producto.id
            }

        })
            return res.status(200).json({
            count:productos.length,
            countByCategory: clasesEdited,
             products:productosEdit,
             status:200
         });
    },
    productsDetail:async(req,res)=>{
        const product= await db.Producto.findByPk(req.params.id,{include:["imagenes_producto"]})  
        const productEdited= {
        id: product.id,
        nombre:product.nombre,
        descripcion:product.descripcion,
        marca:product.marca ,
        precio:product.precio ,
        modelo:product.modelo,
        clase_id:product.clase_id ,
        imagenes_producto:"http://localhost:3000/images/"+product.imagenes_producto[0].nombre_imagen
        }
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(200).json({
             product:productEdited,
             status:200
         });

    },
    productsLast:async(req,res)=>{
        const Producto = await db.Producto.findAll({
            include:["clase"],
            include:["imagenes_producto"]
        })
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(200).json({
            product:Producto[Producto.length-1],
            status:200
        });
        
    }
    
}
module.exports = apiController;