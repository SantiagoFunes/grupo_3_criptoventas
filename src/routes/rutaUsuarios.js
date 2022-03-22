let express = require ("express");
const path = require("path");
const multer = require("multer");
const usuariosController = require("../controllers/usuariosController");
let router = express.Router();
const { body,validationResult } = require("express-validator");
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

// validaciones de registro

router.post("/registro", upload.single("image"),
[
   
        body('name','Debe ingresar un nombre con mas de 2 caracteres')
        .exists()
        .isLength({ min: 2 }),
        body('last_name','Debe ingresar un apellido con mas de 2 caracteres')
        .exists()
        .isLength({ min: 2 }),
        body('email','Email invalido')
        .exists()
        .isEmail(),
        body('pass','La contraseña debe tener mas de 8 caracteres')
        .exists()
        .isLength({min:8}),
      ],

    usuariosController.nuevoUsuario);

router.get("/logout",authMiddleware,usuariosController.logout)
router.post("/login"
//  ,[
//     body("email").isEmail().withMessage("Credenciales invalidas"),

//  ] 
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