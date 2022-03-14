let express = require ("express");
const path = require("path");
const multer = require("multer");
const usuariosController = require("../controllers/usuariosController");
let router = express.Router();
const { check,body } = require("express-validator");
const authMiddleware = require("../../middlewares/authMiddleware");
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../../public/images"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload=multer({storage:storage})


router.get("/", usuariosController.vistaUsuarios);
router.get("/profile",authMiddleware,usuariosController.vistaPerfil);
router.put("/:id",authMiddleware,upload.single("image"), usuariosController.editarUsuario);
router.get("/register", usuariosController.vistaRegister);
router.get("/:id/edicion", usuariosController.vistaEdicion);
router.delete("/delete/:id", usuariosController.eliminarUsuario);
router.post("/registro", upload.single("image"),
[
    body('name','Name is required').exists()
    .isLength({ min: 5, max: 20 }),
    body('last_name', 'Last name length should be 10 to 20 characters')
    .exists()
    .isLength({ min: 5, max: 20 }),
],
    
    usuariosController.nuevoUsuario);

router.get("/logout",authMiddleware,usuariosController.logout)
router.post("/login"
 ,[
     check("email").isEmail().withMessage("e-mail invalido"),

 ] 
,usuariosController.processLogin);
router.get("/check", function(req,res){
    res.send("el usuario logueado es" + req.session.usuarioLogueado.first_name)
})
router.get("/prueba", function(req,res){
    req.session.nro = req.session.nro ? ++ req.session.nro:1;
    let numero =  req.session.nro;
    res.send ("se ingreso " + numero);
});

module.exports=router;