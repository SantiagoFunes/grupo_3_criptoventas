const fs= require("fs");
let bcrypt = require("bcrypt");
let usersController={}

module.exports=usersController;
const path = require('path')

const{Usuario}=require("../../database/models")

const usuariosController={
    vistaUsuarios:(req,res)=>{
       res.render('users/users.ejs')
    },
    vistaRegister:(req,res)=>{
        res.render('users/register.ejs')
    },
    nuevoUsuario:(req,res)=>{

        // let user = await User.findOne({
        //     where: { email: req.body.email },
        // });
        const usersFilePath = path.join(
            __dirname,
            "../database/users.json"
        );
        const users = JSON.parse(
            fs.readFileSync(usersFilePath, "utf-8")
        );
        const ultimoElemento = users.slice(-1)[0]
        let userName = "nouserimage.jpg";
        if(req.file){
           userName=req.file.filename
         }
        const nuevoUsuario = {

            id:ultimoElemento.id+1,
            
            first_name:req.body.name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.pass,12),
            category:req.body.category,
            imagen:userName
        }
        users.push(nuevoUsuario)
        const newUsers = JSON.stringify(
            users
        );
        fs.writeFileSync(usersFilePath,newUsers)
        // res.send(nuevoUsuario);
        res.redirect("/productos")
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