const fs= require("fs");
let bcrypt = require("bcryptjs");
let usersController={}

module.exports=usersController;
const path = require('path')

const{Usuario,Clase}=require("../../database/models")

const usuariosController={
    vistaUsuarios:async(req,res)=>{
        // res.render('users/users.ejs')
        const users =  await Clase.findAll()
        console.log(users);
        res.send(users)
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
    processLogin:(req,res)=>{
        
        const usersFilePath = path.join(
            __dirname,
            "../database/users.json"
        );
        let archivoUsuario=fs.readFileSync(usersFilePath, "utf-8")
        let users;
        if(archivoUsuario==""){
            users=[];

        }else{
            users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        }
        for(i=0; i<users.length; i++){
            if((users[i].email== req.body.email)&&(bcrypt.compareSync(req.body.pass,users[i].password))){

                
                let usuarioaLoguearse = users[i];
                req.session.usuarioLogueado=usuarioaLoguearse;
                res.cookie("user_cookie", usuarioaLoguearse.email, { maxAge:70000});
                res.redirect("/users/profile")  
            }

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