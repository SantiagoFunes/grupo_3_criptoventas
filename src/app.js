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
    res.render('users/register')
})

app.get("/login",(req,res) => {
    res.render('users/login')
})

app.get("/carrito",(req,res) => {
    res.render('products/carrito')
})
app.get("/productos",(req,res) => {
    res.render('products/productos')
})

app.get("/detalle",(req,res) => {
    res.render('products/detalle')
})
app.get("/creacionyedicion",(req,res) => {
    res.render('products/editor')
})
app.listen(process.env.PORT || 3000, ()=> {
    console.log("Servidor funcionando");
})
//  ---termina la zona de puertos, comienza funcionalidad---
function showmenu() {
    document.getElementsByClassName("header-a").classList.toggle("show");
  }
app.set('view engine', 'ejs');