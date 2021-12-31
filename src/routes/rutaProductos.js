let express=require ("express");
const productsControllers = require("../controllers/productosController");
let router = express.Router();
const path = require("path");
const multer = require("multer");
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
router.get("/creacion", productsControllers.vistaCreacion);
router.post("/",upload.single("image"), productsControllers.nuevoProducto);
router.get("/:id/edicion", productsControllers.vistaEdicion);
router.get("/detalle/:id", productsControllers.detalleProducto);
router.delete("/:id", productsControllers.eliminarProducto);


module.exports=router;

