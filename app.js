const express = require("express")
const app = express()
const path = require("path");
const exp = require("constants");
app.use(express.urlencoded({extended: true}))


const publicpath = path.resolve(__dirname,'./public');
app.use(express.static(publicpath))


app.get("/",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
})

app.get("/register",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
})

app.get("/login",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get("/carrito",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'))
})

app.get("/detalle",(req,res) => {
    res.sendFile(path.resolve(__dirname, './views/detalle.html'))
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("Servidor funcionando");
})
// ---termina la zona de puertos, comienza funcionalidad---
// addEventListener('DOMContentLoaded', ()=>{
//     const btn_menu=document.querySelector('btn-menu')
//     if (btn_menu){
//         btn_menu.addEventListener('click',()=>{
//             const menu_items=document.querySelector('header-items a')
//             menu_items.classList.toggle('show')
//         })
//     }
// })