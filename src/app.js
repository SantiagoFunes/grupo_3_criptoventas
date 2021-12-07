const express = require("express")
const app = express()
const path = require("path");
const exp = require("constants");
app.use(express.urlencoded({extended: true}))

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const publicpath = path.resolve(__dirname,'../public');
app.use(express.static(publicpath))


app.get("/",(req,res) => {
    res.render('products/home')
 })

app.get("/register",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/users/register'))
})

app.get("/login",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/users/login'))
})

app.get("/carrito",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/products/carrito'))
})

app.get("/detalle:idProducto",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/products/detalle'))
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Servidor funcionando");
})
//  ---termina la zona de puertos, comienza funcionalidad---
function showmenu() {
    document.getElementsByClassName("header-a").classList.toggle("show");
  }
app.set('view engine', 'ejs');