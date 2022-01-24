let express=require ("express");
const usuariosController = require("../controllers/usuariosController");
let router = express.Router();
const path = require("path");
const multer = require("multer");
const { check } = require("express-validator");
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
router.get("/register", usuariosController.vistaRegister);
router.post("/",upload.single("image"), usuariosController.nuevoUsuario);
router.get("/logout",authMiddleware,usuariosController.logout)
router.post("/login"
 ,[
     check("email").isEmail().withMessage("e-mail invalido"),
     check("pass").isLength({min:8}).withMessage("Debe tener como minimo 8 caracteres")
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
// router.put("/:id",upload.single("image"),usuariosController.editarProducto);
// router.get("/detalle/:id", usuariosController.detalleProducto);
// router.delete("/delete/:id", usuariosController.eliminarProducto);


module.exports=router;