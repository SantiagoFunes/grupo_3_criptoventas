const fs= require("fs");
let bcrypt = require("bcrypt");
let usersController={}
const {validationResult}=require ("express-validator")
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
    eliminarUsuario:(req,res)=>{
        res.send("Holis")
    },
    nuevoUsuario:async function(req,res){
        const errors= validationResult(req)
            if (errors.isEmpty()){
        let userDB = await Usuario.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (userDB != null) {
                return res.render("users/register", {
                    
                    errors: [{ msg: "El email ya se encuentra registrado" }],
                });
            }
            let filename = "nouserimage.jpg"
            if (req.file){
                filename=req.file.filename
            }
        await Usuario.create({
            nombre:req.body.name,
            apellido:req.body.last_name,
            email:req.body.email,
            contraseña:bcrypt.hashSync(req.body.pass, 10),
            rol:1,
            img:filename  
        });
        res.redirect("/users")
    }else{
        return res.render('users/register', {errors:errors.errors})
    }
    },
    
    processLogin:async(req,res)=>{
            const errors= validationResult(req)
            if (errors.isEmpty()){
                const user = await Usuario.findOne({where: {email:req.body.email}})
            
                if (user != undefined) {
                    if (bcrypt.compareSync(req.body.password, user.contraseña)) {
                        var usuarioaLoguearse = user;
                    } else {
                        return res.render('users/users.ejs', {errors:[{msg:"La contraseña es incorrecta"}]})
                        
                    }
                } else {
                    return res.render('users/users.ejs', {errors:[{msg:"Oops, ocurrio un error"}]})
                }
                    req.session.usuarioLogueado=usuarioaLoguearse;
                    res.cookie("user_cookie", usuarioaLoguearse.email, { maxAge:70000});
                    res.redirect("/users/profile")  
            }else{
                return res.render('users/users.ejs', {errors:errors.errors})
            }

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