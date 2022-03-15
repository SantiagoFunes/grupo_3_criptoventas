 module.exports =(sequelize, dataTypes)=>{
 let alias = 'Usuario';
 let cols = {
    nombre:{
        type:dataTypes.STRING(255)
    },
    apellido:{
        type:dataTypes.STRING(255)
    },
    email:{
        type:dataTypes.STRING(255)
    },
    contraseña:{
        type:dataTypes.STRING(255)
    },
    rol:{
        type:dataTypes.INTEGER(11)
    },
    img:{
        type:dataTypes.STRING(255)
    }
 };
 let config={
     tableName:"users",
     timestamps: false
 }
     const Usuario =sequelize.define(alias,cols,config);

     return Usuario;
    }