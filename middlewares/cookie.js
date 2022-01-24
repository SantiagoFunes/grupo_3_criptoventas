const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../src/database/users.json");
var archivoUsuario = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

async function cookie(req, res, next) {
    if (
        req.cookies.user_cookie != undefined &&
        req.session.usuarioLogueado == undefined
    ) {
        
        for(i=0; i<archivoUsuario.length; i++){
            if((archivoUsuario[i].email== req.body.email)&&(bcrypt.compareSync(req.body.pass,archivoUsuario[i].password))){
                // res.send ("Bienvenido " + archivoUsuario[i].first_name)
                
                let usuarioaLoguearse = archivoUsuario[i];
                req.session.usuarioLogueado=usuarioaLoguearse;
               
            }
        }
    }

    next();
}

module.exports = cookie;