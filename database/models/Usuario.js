module.exports =(sequelize, dataTypes)
let alias = 'Usuarios';
let cols = {

};
let config={
    tableName:"usuarios",
    timestamps: false
}
    const Usuario =sequelize.define(alias,cols,config);

    return Usuario;
