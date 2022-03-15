let express=require ("express");
const productsControllers = require("../controllers/productosController");
let router = express.Router();
const{Producto,Clase,Imagenes_producto}=require("../../database/models")
const { body,validationResult } = require("express-validator");
const path = require("path");
const multer = require("multer");
const isAdminMiddleware = require("../../middlewares/isAdmin")
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

router.get("/", productsControllers.todosLosProductos);
router.get("/buscar", productsControllers.search);
router.get("/creacion", isAdminMiddleware, productsControllers.vistaCreacion);
router.post("/",isAdminMiddleware,upload.array("image", 5),
 [
   
     body('nombre','Debe ingresar un nombre con al menos 5 caracteres')
     .exists()
     .isLength({ min: 5 }),
     body('descripcion','Debe ingresar al menos 20 caracteres en la descripcion')
     .exists()
     .isLength({ min: 20 }),

   ],(req,res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const validaciones = errors.array()
          res.render("error/error.ejs",{validaciones:validaciones})
      }
    }
   ,

productsControllers.nuevoProducto);
router.get("/:id/edicion",isAdminMiddleware, productsControllers.vistaEdicion);
router.put("/:id",upload.single("image"),isAdminMiddleware, productsControllers.editarProducto);
router.get("/detalle/:id", productsControllers.detalleProducto);
router.delete("/delete/:id", productsControllers.eliminarProducto);


module.exports=router;

