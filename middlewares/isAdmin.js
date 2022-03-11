function isAdminMiddleware(req, res, next) {
    if (
        req.session.usuarioLogueado != undefined &&
        req.session.usuarioLogueado.rol == 2
    ) {
        next();
    } else {
        res.redirect("/");
    }
}

module.exports = isAdminMiddleware;