module.exports =(sequelize, dataTypes)=>{
let alias = 'Clase';
let cols = {
   nombre:{
       type:dataTypes.STRING(255)
   }
};
let config={
    tableName:"clase",
    timestamps: false
}
    const Clase =sequelize.define(alias,cols,config);
    Clase.associate=(models)=>{
        Clase.hasMany(models.Producto, {
            as:"producto",
            foreignKey:"clase_id"
        })
    }
    return Clase;
}