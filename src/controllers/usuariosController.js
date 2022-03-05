const fs= require("fs");
let bcrypt = require("bcrypt");
let usersController={}

module.exports=usersController;
const path = require('path')

const{Usuario}=require("../../database/models");
const { isNull } = require("util");

const usuariosController={
    vistaUsuarios:(req,res)=>{
       res.render('users/users.ejs')
    },
    vistaRegister:(req,res)=>{
        res.render('users/register.ejs')
    },
    nuevoUsuario:async function(req,res){
        await Usuario.create({
            nombre:req.body.name,
            apellido:req.body.last_name,
            email:req.body.email,
            contraseña:req.body.pass,
            rol:req.body.category,
            img:req.file.filename  
        });
        res.redirect("/users")

    },
    
    processLogin:async(req,res)=>{
        
            const user = await Usuario.findOne({where: {email:req.body.email}})
            
            if (user != undefined) {
                if (bcrypt.compareSync(req.body.password, user.contraseña)) {
                    var usuarioaLoguearse = user;
                } else {
                    res.send("Contraseña invalida")
                    return
                }
            } else {
                res.send("ERROR")
                return
            }
                req.session.usuarioLogueado=usuarioaLoguearse;
                res.cookie("user_cookie", usuarioaLoguearse.email, { maxAge:70000});
                res.redirect("/users/profile")  
            

        
    },
    logout:(req,res)=>{
        req.session.destroy();
        res.clearCookie("user_cookie");
        res.redirect("/");
    },
    vistaPerfil:(req,res)=>{
        res.render('users/profile.ejs');
    }
}
module.exports= usuariosController;