const fs= require("fs");
let bcrypt = require("bcrypt");
let usersController={}
const {validationResult, body}=require ("express-validator")
module.exports=usersController;
const path = require('path')

const{Usuario}=require("../../database/models");
const { isNull } = require("util");

const ResponseError = ({res,path,message}) => res.render(path, {errors: [{ msg: message }]});

const usuariosController={
    vistaUsuarios:(req,res)=>{
       res.render('users/users.ejs')
    },
    vistaRegister:(req,res)=>{
        res.render('users/register.ejs')
    },
    vistaEdicion:(req,res)=>{
        res.render('users/userEdit.ejs')
    },
    eliminarUsuario:async(req,res)=>{
        let usuarioDestruir = req.params.id;
        await Usuario.destroy({
            where:{id: usuarioDestruir}
        })
        req.session.destroy();
        res.clearCookie("user_cookie");
        res.redirect("/");
    },
    nuevoUsuario:async function(req,res){
        const errors= validationResult(req)
        console.log('aca es el erorres',errors);
        
        if (errors.isEmpty()){
            let userDB = await Usuario.findOne({
                    where: {
                        email: req.body.email,
                    },
                });

            if (userDB != null) return ResponseError({res,path:"users/register",message:"El email del usuario ya se encuentra registrado"})
            
            let filename = "nouserimage.jpg"
            if (req.file){
                console.log(req.file.filename);
                const validationExtensionImage = ['jpeg','jpg','png','gif'].includes(req.file.filename.toLowerCase().split('.')[1])
                if(validationExtensionImage){
                    filename=req.file.filename
                }
                else {
                    return ResponseError({res,path:"users/register",message:"Formato de imagen incorrecto"})
                }
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
                    res.cookie("user_cookie", usuarioaLoguearse.email, { maxAge:7000});
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
    vistaPerfil:async(req,res)=>{
        const userId = req.session.usuarioLogueado.id
        const user = await Usuario.findByPk(userId)

        res.render('users/profile.ejs',{user});
    },
    editarUsuario:async(req,res)=>{
        console.log(req.body);
         await Usuario.update({
             email:req.body.mail,
             nombre:req.body.nombre,
             apellido:req.body.apellido,
             img:req.file.filename
     },{
         where:{ id: req.params.id}
     });
     res.redirect("/users/profile")
    }

}
module.exports= usuariosController;