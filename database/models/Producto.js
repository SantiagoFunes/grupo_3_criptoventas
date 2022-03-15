module.exports =(sequelize, dataTypes)=>{
let alias = 'Producto';
let cols = {
   nombre:{
       type:dataTypes.STRING(255)
   },
   descripcion:{
       type:dataTypes.STRING(255)
   },
   marca:{
       type:dataTypes.STRING(255)
   },
   precio:{
       type:dataTypes.INTEGER(11)
   },
    modelo:{
        type:dataTypes.STRING(255)
    }
}
let config={
    tableName:"products",
    timestamps: false
}
    const Producto =sequelize.define(alias,cols,config);
    Producto.associate=(models)=>{
        Producto.belongsTo(models.Clase, {
            as:"clase",
            foreignKey:"clase_id"
        })
        ;
        Producto.hasMany(models.Imagenes_producto,{
            as:"imagenes_producto",
            foreignKey:"producto_id"
        })
    }
    return Producto;
}