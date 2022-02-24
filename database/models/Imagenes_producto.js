module.exports =(sequelize, dataTypes)=>{
let alias = 'Imagenes_producto';
let cols = {
   nombre_imagen:{
       type:dataTypes.STRING(255)
   }
}
let config={
    tableName:"product_images",
    timestamps: false
}
    const Imagenes_producto =sequelize.define(alias,cols,config);
    Imagenes_producto.associate=(models)=>{
        Imagenes_producto.belongsTo(models.Producto, {
            as:"product",
            foreignKey:"producto_id"
        })
    }
    return Imagenes_producto;
}