function authMiddleware(req,res,next){
    if(req.session.usuarioLogueado !=undefined){
        next();
    }else{
        res.redirect("/users");
    }
    
}
module.exports = authMiddleware;