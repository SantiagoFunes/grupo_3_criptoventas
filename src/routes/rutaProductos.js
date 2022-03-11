let express=require ("express");
const productsControllers = require("../controllers/productosController");
let router = express.Router();
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
router.post("/",isAdminMiddleware,upload.array("image", 5), productsControllers.nuevoProducto);
router.get("/:id/edicion",isAdminMiddleware, productsControllers.vistaEdicion);
router.put("/:id",upload.single("image"),isAdminMiddleware, productsControllers.editarProducto);
router.get("/detalle/:id", productsControllers.detalleProducto);
router.delete("/delete/:id", productsControllers.eliminarProducto);


module.exports=router;

